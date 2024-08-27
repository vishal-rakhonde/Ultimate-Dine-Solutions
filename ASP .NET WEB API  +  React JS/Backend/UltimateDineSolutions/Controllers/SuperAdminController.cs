using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UltimateDineSolutions.Models;
using static UltimateDineSolutions.Controllers.AdminController;

namespace UltimateDineSolutions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperAdminController : ControllerBase
    {
        private readonly SuperAdmin _superAdmin = new SuperAdmin();

        // POST: api/SuperAdmin/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] SuperAdminLogin request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Login request data is null." });
            }

            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Email and password cannot be empty." });
            }

            if (string.Equals(request.Email, _superAdmin.Email, StringComparison.OrdinalIgnoreCase) &&
               string.Equals(request.Password, _superAdmin.Password, StringComparison.Ordinal))
            {
                return Ok("Login successful.");
            }
            else
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }
        }
    }
    public class SuperAdminLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

