using WebAPI.Dtos;

public class OrderResponseDTO
{
    public string ItemId { get; set; }
    public int Quantity { get; set; }
    public string OrderStatus { get; set; }
    public string OrderId { get; set; }
    public string UserId { get; set; }
    public List<OrderItemResponseDTO> Items { get; set; }
}