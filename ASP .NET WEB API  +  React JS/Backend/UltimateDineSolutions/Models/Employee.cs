using System.ComponentModel.DataAnnotations;

namespace UltimateDineSolutions.Models
{
    public class Employee
    {
        [Required]
        [Key]  // Ensure the primary key attribute is present
        public int EmpId { get; set; }

        [Required(ErrorMessage = "Employee Name is required.")]
        [StringLength(255, ErrorMessage = "Employee Name cannot exceed 255 characters.")]
        public string EmpName { get; set; }

        [Required(ErrorMessage = "Contact Number is required.")]
        [StringLength(10, ErrorMessage = "Contact Number cannot exceed 10 characters.")]
        [RegularExpression(@"^\+?[1-9]\d{1,14}$", ErrorMessage = "Invalid Contact Number format.")]
        public string ContactNo { get; set; }

       // [Required(ErrorMessage = "Joining Date is required.")]
        public DateTime JoiningDate { get; set; }

        [Required(ErrorMessage = "Role is required.")]
        [StringLength(100, ErrorMessage = "Role cannot exceed 100 characters.")]
        public string Role { get; set; }
    }
}
