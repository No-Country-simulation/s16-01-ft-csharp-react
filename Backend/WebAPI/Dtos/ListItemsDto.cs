using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace WebAPI.Dtos
{
    public class ListItemsDto
    {
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public int ItemPrice { get; set; }
        public string Description { get; set; }
        public string KeyWords { get; set; }
        public int Portion { get; set; }
        public int NutritionalValue { get; set; }
        public int PreparationTime { get; set; }
        public string ImageUrl { get; set; }
    }
}
