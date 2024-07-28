using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Waiter
    {
        [Required]
        [MaxLength(20)]
        public string WaiterName { get; set; }

        [Key]
        public string WaiterId { get; set; }

        // Relación con Table
        public virtual ICollection<Table> Tables { get; set; } = new List<Table>();

        // Relación con Session
        public ICollection<Session> Sessions { get; set; } = new List<Session>();
    }
}
