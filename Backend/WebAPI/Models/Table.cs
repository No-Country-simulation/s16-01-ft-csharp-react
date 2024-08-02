using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Table
    {
        [Key]
        public string TableId { get; set; }

        [Required]
        public string TableNumber { get; set; }

        public string TableStatus { get; set; }

        // Foreign key to Waiter
        public string WaiterId { get; set; }
        public Waiter Waiter { get; set; }
    }
}
