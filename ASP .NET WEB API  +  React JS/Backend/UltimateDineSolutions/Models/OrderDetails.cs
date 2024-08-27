using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
   public class OrderDetails
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        public string GuestName { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        //public ICollection<OrderDetailsItem> OrderDetailsItems { get; set; }
    }
}
