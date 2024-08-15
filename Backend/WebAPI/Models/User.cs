namespace WebAPI.Models
{
    public class User
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }

        // Foreing Key
        public string TableId { get; set; }
        public string SessionId { get; set; }

        // Navigation property
        public List<Order> Orders { get; set; }
        public Session Session { get; set; }
    }
}
