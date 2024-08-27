using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using UltimateDineSolutions.Models;

namespace UltimateDineSolutions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerDetailsController : ControllerBase
    {
        private readonly string _connectionString = "server=localhost;user=root;password=cdac;database=ultimatedinesolutions";

        /* public CustomerDetailsController(IConfiguration configuration)
         {
             _connectionString = configuration.GetConnectionString("DefaultConnection");
         }*/

        [HttpPost]
        public IActionResult PostCustomerDetails(CustomerDetails customerDetails)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                string query = "INSERT INTO CustomerDetails (Name, MobileNo, Email) VALUES (@Name, @MobileNo, @Email)";

                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Name", customerDetails.Name);
                    command.Parameters.AddWithValue("@MobileNo", customerDetails.MobileNo);
                    command.Parameters.AddWithValue("@Email", customerDetails.Email);

                    command.ExecuteNonQuery();
                }
            }

            return Ok(new { message = "Customer details saved successfully." });
        }
    }
}
