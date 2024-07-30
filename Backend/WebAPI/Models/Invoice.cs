using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Invoice
    {
        [Key]
        public string InvoiceId { get; set; }
        public string SessionId { get; set; }
        public string UserId { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string InvoiceStatus { get; set; } // "finished", "unpaid", "pending"
        public string PaymentMethod { get; set; } // "credit card", "cash", etc.
    }
}
