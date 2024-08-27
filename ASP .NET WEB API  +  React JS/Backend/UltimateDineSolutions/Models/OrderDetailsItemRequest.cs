using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class OrderDetailsItemRequest
    {
        [Required]
        public int FoodItemId { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
