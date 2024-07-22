namespace OrderlyAPI.Dtos
{
    public class ItemsListDTO
    {
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public string Price { get; set; }
        public string Description { get; set; }
        public string KeyWords { get; set; }
        public string Portion { get; set; }
        public int TutritionalValue { get; set; }
        public int PrepTime { get; set; }
        public string ImageUrl { get; set; }
    }
}
