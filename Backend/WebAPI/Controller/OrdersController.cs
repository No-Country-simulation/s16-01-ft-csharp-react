using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Models;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/table/{OrderId}/user/order")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderlyDbContext _context;

        public OrdersController(OrderlyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<OrderResponseDTO>>> CreateOrder([FromBody] OrderRequestDTO orderRequest)
        {
            if (orderRequest == null || string.IsNullOrWhiteSpace(orderRequest.Token) ||
                orderRequest.Data == null || string.IsNullOrEmpty(orderRequest.Data.UserId) ||
                string.IsNullOrEmpty(orderRequest.Data.ItemId) || orderRequest.Data.Quantity <= 0)
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
                return NotFound("Item not Found");
            }

            var order = new Order
            {
                OrderId = Guid.NewGuid().ToString(),
                UserId = user.UserId,
                UserName = user.UserName,
                OrderStatus = "New",
                OrderItems = new List<OrderItem>
                {
                    new OrderItem
                    {
                        OrderItemId = Guid.NewGuid().ToString(),
                        ItemId = item.ItemId,
                        Quantity = orderRequest.Data.Quantity
                    }
                }
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var response = new OrderResponseDTO
            {
                OrderId = order.OrderId,
                UserId = user.UserId,
                Items = order.OrderItems.Select(oi => new OrderItemResponseDTO
                {
                    ItemId = oi.ItemId,
                    Quantity = oi.Quantity
                }).ToList(),
                OrderStatus = order.OrderStatus
            };

            return CreatedAtAction(nameof(CreateOrder), new { id = response.OrderId }, response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrder(string id, [FromBody] OrderRequestDTO orderRequest)
        {
            if (orderRequest == null || string.IsNullOrWhiteSpace(orderRequest.Token) ||
                orderRequest.Data == null || string.IsNullOrEmpty(orderRequest.Data.UserId) ||
                string.IsNullOrEmpty(orderRequest.Data.ItemId) || orderRequest.Data.Quantity <= 0)
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
                return NotFound("Item not Found");
            }

            var order = await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.OrderId == id && o.UserId == user.UserId);


            if (order == null)
            {
                return NotFound("Order not found.");
            }

            var orderItem = order.OrderItems.FirstOrDefault(oi => oi.ItemId == item.ItemId);
            if (orderItem != null)
            {
                orderItem.Quantity = orderRequest.Data.Quantity;
            }
            else
            {
                order.OrderItems.Add(new OrderItem
                {
                    OrderItemId = Guid.NewGuid().ToString(),
                    ItemId = item.ItemId,
                    Quantity = orderRequest.Data.Quantity,
                });
            }

            order.OrderStatus = "Update";

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            var response = new OrderResponseDTO
            {
                OrderId = order.OrderId,
                UserId = user.UserId,
                Items = order.OrderItems.Select(oi => new OrderItemResponseDTO
                {
                    ItemId = oi.ItemId,
                    Quantity = oi.Quantity
                }).ToList(),
                OrderStatus = order.OrderStatus
            };

            return Ok(response);
        }
    }
}
