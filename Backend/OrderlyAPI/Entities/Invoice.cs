using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace OrderlyAPI.Entities
{
    public class Invoice
    {
        public string InvoiceId { get; set; }
        public string SessionId { get; set; }
        public string UserId { get; set; }
        public int TotalAmount { get; set; }
        public DateTime Created {  get; set; }
        public string InvoiceStatus { get; set; }
        public string PaymentMethod {  get; set; }
    }
}
