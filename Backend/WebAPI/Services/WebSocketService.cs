using System;
using System.Collections.Concurrent;
using System.Net.Sockets;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class WebSocketService
    {
        private readonly ConcurrentDictionary<string, List<WebSocket>> _sockets = new ConcurrentDictionary<string, List<WebSocket>>();

        public async Task AddSocketAsync(WebSocket socket, string sessionId)
        {
            if (!_sockets.ContainsKey(sessionId))
            {
                _sockets[sessionId] = new List<WebSocket>();
            }
            _sockets[sessionId].Add(socket);
            await SendInitialMessageAsync(socket);
        }

        public async Task RemoveSocketAsync(string sessionId, WebSocket socket)
        {
            if (_sockets.TryGetValue(sessionId, out var sockets))
            {
                if (sockets.Remove(socket))
                {
                    await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Session closed", CancellationToken.None);
                }
            }
        }

        public async Task BroadcastMessageToSessionAsync(string sessionId, WebSocketMessage message)
        {
            if (_sockets.TryGetValue(sessionId, out var sockets))
            {
                var serializedMessage = JsonConvert.SerializeObject(message);
                var messageBuffer = Encoding.UTF8.GetBytes(serializedMessage);

                foreach (var socket in sockets)
                {
                    if (socket.State == WebSocketState.Open)
                    {
                        await socket.SendAsync(new ArraySegment<byte>(messageBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                }
            }
        }

        private async Task SendInitialMessageAsync(WebSocket socket)
        {
            var message = new WebSocketMessage
            {
                Type = "Connected",
                Data = "Welcome to the WebSocket service!"
            };
            var serializedMessage = JsonConvert.SerializeObject(message);
            var messageBuffer = Encoding.UTF8.GetBytes(serializedMessage);
            await socket.SendAsync(new ArraySegment<byte>(messageBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}
