using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        [StringLength(100)]
        public string GuestName { get; set; }

        [Required]
        public DateTime OrderDateTime { get; set; }

        public ICollection<OrderDetailsItem> OrderDetailsItems { get; set; }
    }
}
