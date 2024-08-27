using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class OrderDetailsItemResponse
    {

        public int OrderId { get; set; }

        [Required]
        public string GuestName { get; set; }

        [Required]
        public DateTime DateTime { get; set; }
        
        public List<OrderDetailsItem> orderDetailsItems { get; set; }
    }
}
