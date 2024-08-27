using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class FoodItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FoodItemName { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Required]
        [StringLength(50)]
        public string Category { get; set; }
    }


}
