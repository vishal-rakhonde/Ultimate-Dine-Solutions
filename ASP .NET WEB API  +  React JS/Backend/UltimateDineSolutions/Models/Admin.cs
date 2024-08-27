using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class Admin
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(30, ErrorMessage = "Name cannot be longer than 30 characters.")]
        public string Name { get; set; }

        //[Required(ErrorMessage = "Username is required.")]
       // [StringLength(30, ErrorMessage = "Username cannot be longer than 30 characters.")]
       // [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers, and underscores.")]
        public string Username { get; set; }

       // [Required(ErrorMessage = "Password is required.")]
       // [StringLength(30, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 30 characters long.")]
        public string Password { get; set; }

    }
}
