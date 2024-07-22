using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderlyAPI.Entities
{
    public class Session
    {
        public string SessionId { get; set; }
        public string Token { get; set; }
        public string OwnerId { get; set; }

        [ForeignKey("OwnerId")]
        public virtual Users Owner { get; set; }
        public virtual ICollection<Users> UsersRef { get; set; } = new List<Users>();
    }
}
