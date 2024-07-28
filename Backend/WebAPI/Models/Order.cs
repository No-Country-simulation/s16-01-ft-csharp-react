using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Order
    {
        public string OrderId { get; set; }
        public string OrderStatus { get; set; }

        [Required] 
        public string UserName { get; set; }

        // Foreing Key
        public string UserId { get; set; }

        // Propiedad de navegación a User
        [ForeignKey("UserId")]
        public User User { get; set; }

        // Relación con OrderItem
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
