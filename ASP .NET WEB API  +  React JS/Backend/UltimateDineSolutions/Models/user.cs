using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; } // Corresponds to the primary key in the database

        [Required]
        [StringLength(20)]
        public string Name { get; set; } // User's name

        [Required]
        [EmailAddress]
        [StringLength(50)]
        public string Email { get; set; } // User's email

        [Required]
        [StringLength(15)]
        public string Mobile { get; set; } // User's mobile number

        [Required]
        [StringLength(20)]
        public string Password { get; set; } // User's password (hashed for security)

        [StringLength(10)]
        public string Gender { get; set; } // User's gender

        [StringLength(20)]
        public string Role { get; set; } // User's role
    }
}
