namespace WebAPI.Models
{
    public class WebSocketMessage
    {
        public string Type { get; set; }
        public string UserId { get; set; }
        public string SessionId { get; set; }
        public object Data { get; set; }
    }
}
