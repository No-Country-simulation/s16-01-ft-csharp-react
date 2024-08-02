using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace WebAPI.Models
{
    public class Item
    {
        [Key]
        public string ItemId { get; set; }

        [NotNull, MaxLength(50)]
        public string ItemName { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal ItemPrice { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

        public List<String> KeyWords { get; set; }

        [Range(0, 10, ErrorMessage = "Portion must be between 1 and 10.")]
        public int Portion { get; set; }

        public List<String> Ingredients { get; set; }

        public string Category { get; set; }

        public string ImageUrl { get; set; }

        // One-to-Many Relationship Navigation with OrderItem
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
