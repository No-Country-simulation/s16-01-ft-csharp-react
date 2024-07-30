using WebAPI.Dtos;

public class OrderResponseDto
{
    public string OrderStatus { get; set; }
    public string OrderId { get; set; }
    public string UserId { get; set; }
    public List<OrderItemResponseDto> Items { get; set; }
}