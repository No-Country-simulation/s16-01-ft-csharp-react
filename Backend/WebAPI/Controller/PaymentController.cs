using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly OrderlyDbContext _context;
        private readonly WebSocketService _webSocketService;

        public PaymentController(OrderlyDbContext context, WebSocketService webSocketService)
        {
            _context = context;
            _webSocketService = webSocketService;
        }

        [HttpPost]
        public async Task<ActionResult> ProcessPayment([FromBody] PaymentRequestDto paymentRequest)
        {
            if (paymentRequest == null || string.IsNullOrEmpty(paymentRequest.UserId) || string.IsNullOrEmpty(paymentRequest.Proportion))
            {
                return BadRequest("Invalid payment data.");
            }

            // Obtener la factura para la sesión y usuario correspondiente
            var invoice = await _context.Invoices
                .Include(i => i.Session)
                .ThenInclude(s => s.Users)
                .FirstOrDefaultAsync(i => i.InvoiceId == paymentRequest.InvoiceId && i.UserId == paymentRequest.UserId);

            if (invoice == null)
            {
                return NotFound("Invoice not found.");
            }

            // Procesar el pago basado en la proporción (proporción puede ser "EQUAL", "INDIVIDUAL", "GROUP")
            decimal amountToPay;
            switch (paymentRequest.Proportion.ToUpper())
            {
                case "EQUAL":
                    amountToPay = invoice.TotalAmount / invoice.Session.Users.Count;
                    break;
                case "INDIVIDUAL":
                    amountToPay = CalculateIndividualPayment(invoice, paymentRequest.UserList);
                    break;
                case "GROUP":
                    amountToPay = CalculateGroupPayment(invoice, paymentRequest.PeerList);
                    break;
                default:
                    return BadRequest("Invalid proportion type.");
            }

            // Actualizar la base de datos con el pago
            invoice.TotalAmount -= amountToPay;
            if (invoice.TotalAmount <= 0)
            {
                invoice.InvoiceStatus = "Paid";
            }

            await _context.SaveChangesAsync();

            // Crear el mensaje WebSocket para notificar a los usuarios
            var message = new WebSocketMessage
            {
                Type = "PaymentProcessed",
                SessionId = invoice.SessionId,
                Data = new
                {
                    Payment = new
                    {
                        UserId = paymentRequest.UserId,
                        Proportion = paymentRequest.Proportion,
                        AmountPaid = amountToPay
                    }
                }
            };

            await _webSocketService.BroadcastMessageToSessionAsync(invoice.SessionId, message);

            return Ok();
        }

        private decimal CalculateIndividualPayment(Invoice invoice, List<string> userList)
        {
            
            return invoice.TotalAmount / userList.Count;
        }

        private decimal CalculateGroupPayment(Invoice invoice, List<string> peerList)
        {
            
            return invoice.TotalAmount / peerList.Count;
        }

    }
}
