using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{

    public class OrderDetailsItem
    {
        [Key]
        public int OrderDetailsItemId { get; set; }

        public int OrderId { get; set; }
        //public OrderDetails Order { get; set; }

        public int FoodItemId { get; set; }
        //public FoodItem FoodItem { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
