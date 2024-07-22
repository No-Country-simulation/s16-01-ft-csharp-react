using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace OrderlyAPI.Entities
{
    public class OrderItem
    {
        public string OrderItemId { get; set; }
        public string OrderId { get; set; }
        public string ItemId { get; set; }
        public int Quantity { get; set; }
    }
}
