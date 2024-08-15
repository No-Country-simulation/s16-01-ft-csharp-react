using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebAPI.Models;

public class WebSocketService
{
    private readonly ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

    public async Task AddSocketAsync(WebSocket socket, string sessionId)
    {
        _sockets.TryAdd(sessionId, socket);
        await SendInitialMessageAsync(socket);
    }

    public async Task RemoveSocketAsync(string sessionId)
    {
        if (_sockets.TryRemove(sessionId, out var socket))
        {
            await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Session closed", CancellationToken.None);
        }
    }

    public async Task BroadcastMessageToSessionAsync(string sessionId, WebSocketMessage message)
    {
        var serializedMessage = JsonConvert.SerializeObject(message);
        var messageBuffer = Encoding.UTF8.GetBytes(serializedMessage);

        foreach (var (key, socket) in _sockets)
        {
            if (key == sessionId && socket.State == WebSocketState.Open)
            {
                await socket.SendAsync(new ArraySegment<byte>(messageBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
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
