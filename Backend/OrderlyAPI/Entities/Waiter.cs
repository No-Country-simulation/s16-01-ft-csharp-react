using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace OrderlyAPI.Entities
{
    public class Waiter
    {
        public string WaiterName { get; set; }
        public string TableId { get; set; }
    }
}
