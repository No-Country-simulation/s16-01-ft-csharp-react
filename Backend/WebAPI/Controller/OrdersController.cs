using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/table/user/order")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderlyDbContext _context;
        private readonly WebSocketService _webSocketService;

        public OrdersController(OrderlyDbContext context, WebSocketService webSocketService)
        {
            _context = context;
            _webSocketService = webSocketService;
        }

        [HttpPost]
        public async Task<ActionResult<OrderResponseDto>> CreateOrder([FromBody] OrderRequestDto orderRequest)
        {
            if (orderRequest == null || string.IsNullOrWhiteSpace(orderRequest.Token) ||
                orderRequest.Data == null || string.IsNullOrEmpty(orderRequest.Data.UserId) ||
                string.IsNullOrEmpty(orderRequest.Data.ItemId))
            {
                return BadRequest("Invalid order data.");
            }

            var session = await _context.Sessions
                .Include(s => s.Users)
                .FirstOrDefaultAsync(s => s.Token == orderRequest.Token);

            if (session == null)
            {
                return NotFound("Session not found.");
            }

            var user = session.Users.FirstOrDefault(u => u.UserId == orderRequest.Data.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var item = await _context.Items.FirstOrDefaultAsync(i => i.ItemId == orderRequest.Data.ItemId);
            if (item == null)
            {
                return NotFound("Item not found.");
            }

            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.UserId == user.UserId && o.OrderStatus == OrderStatus.Pending.ToString());

            if (order == null)
            {
                order = new Order
                {
                    OrderId = Guid.NewGuid().ToString(),
                    UserId = user.UserId,
                    UserName = user.UserName,
                    OrderStatus = OrderStatus.Pending.ToString(),
                    OrderItems = new List<OrderItem>()
                };
                _context.Orders.Add(order);
            }

            var orderItem = new OrderItem
            {
                OrderItemId = Guid.NewGuid().ToString(),
                ItemId = item.ItemId,
                IsReady = false // Initially not Ready
            };
            order.OrderItems.Add(orderItem);

            await _context.SaveChangesAsync();

            // Create the Response
            var response = new OrderResponseDto
            {
                OrderId = order.OrderId,
                UserId = user.UserId,
                Items = order.OrderItems.Select(oi => new OrderItemResponseDto
                {
                    ItemId = oi.ItemId,
                }).ToList(),
                OrderStatus = order.OrderStatus
            };

            // Create the Message for WebSocket
            var message = new WebSocketMessage
            {
                Type = "OrderUpdated",
                SessionId = session.SessionId,
                Data = new
                {
                    OrderId = order.OrderId,
                    Items = order.OrderItems.Select(oi => oi.ItemId).ToList()
                }
            };

            await _webSocketService.BroadcastMessageToSessionAsync(session.SessionId, message);
            return CreatedAtAction(nameof(CreateOrder), new { id = response.OrderId }, response);
        }

        public enum OrderStatus
        {
            Pending,
            Processing,
            Received
        }

        [HttpDelete("{orderId}")]
        public async Task<ActionResult> DeleteOrder(string orderId)
        {
            // Search for the order by the ID
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return NotFound("Order not found");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            // Return 204 No Content
            return NoContent();
        }
    }
}

