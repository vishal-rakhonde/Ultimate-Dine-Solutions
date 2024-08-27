using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class Payment
    {
        public int Id { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 16)]
        public string CardNo { get; set; }

        [Required]
        [StringLength(5)]
        public string ExpiryDate { get; set; }

        [Required]
        [StringLength(3, MinimumLength = 3)]
        public string Cvv { get; set; }

        [StringLength(6, MinimumLength = 6)]
        public string Otp { get; set; }
    }
}

