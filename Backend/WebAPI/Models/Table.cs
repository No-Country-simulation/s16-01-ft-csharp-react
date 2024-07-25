using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Table
    {
        [Key, Range(1, 20)]
        public string TableId { get; set; }

        [Required]
        public string TableNumber { get; set; }

        public string TableStatus { get; set; }
    }
}
