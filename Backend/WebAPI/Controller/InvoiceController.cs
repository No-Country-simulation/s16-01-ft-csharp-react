using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/invoices")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly OrderlyDbContext _context;
        private readonly WebSocketService _websocketService;

        public InvoicesController(OrderlyDbContext context, WebSocketService websocketService)
        {
            _context = context;
            _websocketService = websocketService;
        }

        [HttpPost]
        public async Task<ActionResult<Invoice>> CreateInvoice(string sessionId)
        {
            var session = await _context.Sessions
                .Include(s => s.Users)
                .ThenInclude(u => u.Orders)
                .ThenInclude(o => o.OrderItems)
                .ThenInclude(oi => oi.Item)
                .FirstOrDefaultAsync(s => s.SessionId == sessionId);

            if (session == null)
            {
                return NotFound("Session not found");
            }

            // Verifica si ya existe una factura para este usuario en la sesión
            var existingInvoice = await _context.Invoices
                .FirstOrDefaultAsync(i => i.UserId == session.Users.First().UserId && i.SessionId == sessionId);

            if (existingInvoice != null)
            {
                return Conflict("An invoice already exists for this user in this session.");
            }

            decimal totalAmount = session.Users
                .SelectMany(u => u.Orders)
                .SelectMany(o => o.OrderItems)
                .Sum(oi => oi.Item.ItemPrice);

            var invoice = new Invoice
            {
                InvoiceId = Guid.NewGuid().ToString(),
                SessionId = sessionId,
                UserId = session.Users.First().UserId,
                TotalAmount = totalAmount,
                CreatedDate = DateTime.UtcNow,
                InvoiceStatus = "Pending"
            };

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            // WebSocket notification logic...

            return CreatedAtAction(nameof(CreateInvoice), new { id = invoice.InvoiceId }, invoice);
        }


        [HttpPut("{invoiceId}")]
        public async Task<IActionResult> UpdateInvoice(string invoiceId, Invoice updatedInvoice)
        {
            // Search Invoice to Update 
            var invoice = await _context.Invoices.FindAsync(invoiceId);
            if (invoice == null)
            {
                return NotFound("Invoice not found");
            }

            invoice.TotalAmount = updatedInvoice.TotalAmount;
            invoice.InvoiceStatus = updatedInvoice.InvoiceStatus;
            //invoice.PaymentMethod = updatedInvoice.PaymentMethod;

            //  Web Socket Message Creation
            var message = new WebSocketMessage
            {
                Type = "InvoiceUpdated",
                SessionId = invoice.SessionId,
                Data = new
                {
                    InvoiceId = invoice.InvoiceId,
                    SessionId = invoice.SessionId,
                    UserId = invoice.UserId,
                    TotalAmount = invoice.TotalAmount,
                    CreatedDate = invoice.CreatedDate,
                    InvoiceStatus = invoice.InvoiceStatus
                }
            };

            _context.Invoices.Update(invoice);
            await _websocketService.BroadcastMessageToSessionAsync(invoice.SessionId, message);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
