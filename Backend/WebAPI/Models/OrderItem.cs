using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class OrderItem
    {
        public bool IsReady;

        [Key]
        public string OrderItemId { get; set; }

        public string OrderId { get; set; }
        public virtual Order Order { get; set; }

        public string ItemId { get; set; }
        public virtual Item Item { get; set; }
    }
}
