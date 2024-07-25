using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Session
    {
        [Key]
        public string SessionId { get; set; }

        [Required]
        public string Token { get; set; }

        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
