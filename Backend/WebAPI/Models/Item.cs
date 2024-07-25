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

        public string KeyWords { get; set; }

        [Range(0, 10, ErrorMessage = "Portion must be between 1 and 10.")]
        public int Portion { get; set; }

        [Range(1, 1000, ErrorMessage = "NutritionalValue must be between 1 and 10000.")]
        public int NutritionalValue { get; set; }

        [Range(0, 120, ErrorMessage = "PreparationTime must be between 1 and 120.")]
        public int PreparationTime { get; set; }

        public string ImageUrl { get; set; }

        // Navegación de relación uno a muchos con OrderItem
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
