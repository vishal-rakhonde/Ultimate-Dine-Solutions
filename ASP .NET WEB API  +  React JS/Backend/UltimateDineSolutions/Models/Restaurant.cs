using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class Restaurant
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Restaurant Name is required.")]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "Restaurant Name must be between 2 and 255 characters.")]
        public string RestaurantName { get; set; }

        [Required(ErrorMessage = "Owner's Name is required.")]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "Owner's Name must be between 2 and 255 characters.")]
        public string OwnersName { get; set; }

        [Required(ErrorMessage = "License Number is required.")]
        [StringLength(50, MinimumLength = 5, ErrorMessage = "License Number must be between 5 and 50 characters.")]
        public string LicenseNumber { get; set; }

        [Required(ErrorMessage = "Phone Number is required.")]
        [RegularExpression(@"^\d{10,15}$", ErrorMessage = "Phone Number must be between 10 and 15 digits.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email Address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(255, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}


/*
namespace UltimateDineSolutions.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string RestaurantName { get; set; }
        public string OwnersName { get; set; }
        public string LicenseNumber { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
    }
}*/

