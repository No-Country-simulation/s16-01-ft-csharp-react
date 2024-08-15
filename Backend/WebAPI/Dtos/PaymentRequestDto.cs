
namespace WebAPI.Dtos
{
    public class PaymentRequestDto
    {
        public string UserId { get; set; }
        public string InvoiceId { get; set; }
        public string Proportion { get; set; }
        public List<string> UserList { get; set; }
        public List<string> PeerList { get; set; }
        public string PaymentMethod { get; set; }
    }

}