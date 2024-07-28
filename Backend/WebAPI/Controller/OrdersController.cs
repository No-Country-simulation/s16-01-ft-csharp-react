using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace WebAPI.Controllers
{
    [Route("api/table/user/order")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderlyDbContext _context;

        public OrdersController(OrderlyDbContext context)
        {
            _context = context;
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

            var order = new Order
            {
                OrderId = Guid.NewGuid().ToString(),
                UserId = user.UserId,
                UserName = user.UserName,
                OrderStatus = OrderStatus.Pending.ToString(),
                OrderItems = new List<OrderItem>
                {
                    new OrderItem
                    {
                        OrderItemId = Guid.NewGuid().ToString(),
                        ItemId = item.ItemId,
                        IsReady = false // Inicialmente no listo
                    }
                }
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

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

            return CreatedAtAction(nameof(CreateOrder), new { id = response.OrderId }, response);
        }

        public enum OrderStatus
        {
            Pending,
            Processing,
            Received
        }

        // Función para actualizar el estado de la orden basado en los ítems
        /*public string UpdateOrderStatus(Order order)
        {
            if (order.OrderItems.All(oi => oi.IsReady))
            {
                return OrderStatus.Received.ToString();
            }
            else if (order.OrderItems.Any(oi => oi.IsReady))
            {
                return OrderStatus.Processing.ToString();
            }
            else
            {
                return OrderStatus.Pending.ToString();
            }
        }*/
    }
}
