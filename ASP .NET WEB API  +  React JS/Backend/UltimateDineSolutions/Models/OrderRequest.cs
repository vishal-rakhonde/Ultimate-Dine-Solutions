using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class OrderRequest
    {
        [Required]
        public string GuestName { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        [Required]
        public List<OrderDetailsItemRequest> OrderDetailsItems { get; set; }
    }
}
