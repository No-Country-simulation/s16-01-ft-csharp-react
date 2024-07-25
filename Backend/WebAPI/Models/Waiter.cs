using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Waiter
    {
        [Required]
        [MaxLength(20)]
        public string WaiterName { get; set; }

        public string TableId { get; set; }

        public Table Table { get; set; }
    }
}
