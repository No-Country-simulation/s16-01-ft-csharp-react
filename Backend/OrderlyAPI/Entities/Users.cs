using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace OrderlyAPI.Entities
{
    public class Users
    {
        public string UserId { get; set; }
        [Required] public string UserName { get; set; }
        [Required] public string Token { get; set; }
        public string TableId { get; set; }
        public string SessionId { get; set; }

        [ForeignKey("SessionId")]
        public virtual Session SessionRef { get; set; }

        // Constructor that Generate user name
        public Users()
        {
            UserName = GenerateUserName();
        }

        private string GenerateUserName()
        {
            return "User_" + Guid.NewGuid().ToString("N").Substring(0, 8);
        }
    }
}
