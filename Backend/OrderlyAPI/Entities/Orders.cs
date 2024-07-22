using System.Diagnostics.CodeAnalysis;

namespace OrderlyAPI.Entities
{
	public class Orders
	{
		public string OrderId { get; set; }
		public string UserName { get; set; }
		public string Quantity { get; set; }
		public int UserId { get; set; }
		public int OrderStatus { get; set; }
	}
}
