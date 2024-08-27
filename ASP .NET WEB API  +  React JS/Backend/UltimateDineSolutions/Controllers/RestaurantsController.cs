using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using UltimateDineSolutions.Models;

namespace UltimateDineSolutions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly string _connectionString = "server=localhost;user=root;password=cdac;database=ultimatedinesolutions";
        
        // GET: api/Restaurants
        [HttpGet]
        public async Task<IActionResult> GetRestaurants()
        {
            var restaurants = new List<Restaurant>();

            try
            {
                using (var cn = new MySqlConnection(_connectionString))
                {
                    cn.Open();
                    using (var cmd = new MySqlCommand("SELECT Id, RestaurantName, OwnersName, LicenseNumber, PhoneNumber, Email, Password FROM Restaurant", cn))
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            restaurants.Add(new Restaurant
                            {
                                Id = reader.GetInt32("Id"),
                                RestaurantName = reader.GetString("RestaurantName"),
                                OwnersName = reader.GetString("OwnersName"),
                                LicenseNumber = reader.GetString("LicenseNumber"),
                                PhoneNumber = reader.GetString("PhoneNumber"),
                                Email = reader.GetString("Email"),
                                Password = reader.GetString("Password")
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }

            return Ok(restaurants);
        }

        // GET: api/Restaurants/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurantById(int id)
        {
            Restaurant restaurant = null;

            try
            {
                using (var cn = new MySqlConnection(_connectionString))
                {
                    cn.Open();
                    using (var cmd = new MySqlCommand("SELECT Id, RestaurantName, OwnersName, LicenseNumber, PhoneNumber, Email, Password FROM Restaurant WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                restaurant = new Restaurant
                                {
                                    Id = reader.GetInt32("Id"),
                                    RestaurantName = reader.GetString("RestaurantName"),
                                    OwnersName = reader.GetString("OwnersName"),
                                    LicenseNumber = reader.GetString("LicenseNumber"),
                                    PhoneNumber = reader.GetString("PhoneNumber"),
                                    Email = reader.GetString("Email"),
                                    Password = reader.GetString("Password")
                                };
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }

            if (restaurant == null)
            {
                return NotFound(new { message = "Restaurant not found" });
            }

            return Ok(restaurant);
        }

        // POST: api/Restaurants
        /* [HttpPost]
         public async Task<IActionResult> CreateRestaurant([FromBody] Restaurant restaurant)
         {
             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             try
             {
                 using (var cn = new MySqlConnection(_connectionString))
                 {
                     cn.Open();
                     using (var cmd = new MySqlCommand("INSERT INTO Restaurant (RestaurantName, OwnersName, LicenseNumber, PhoneNumber, Email, Password) VALUES (@RestaurantName, @OwnersName, @LicenseNumber, @PhoneNumber, @Email, @Password)", cn))
                     {
                         cmd.Parameters.AddWithValue("@RestaurantName", restaurant.RestaurantName);
                         cmd.Parameters.AddWithValue("@OwnersName", restaurant.OwnersName);
                         cmd.Parameters.AddWithValue("@LicenseNumber", restaurant.LicenseNumber);
                         cmd.Parameters.AddWithValue("@PhoneNumber", restaurant.PhoneNumber);
                         cmd.Parameters.AddWithValue("@Email", restaurant.Email);
                         cmd.Parameters.AddWithValue("@Password", restaurant.Password);

                         await cmd.ExecuteNonQueryAsync();
                     }
                 }
             }
             catch (Exception ex)
             {
                 return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
             }

             return Ok(new { message = "Restaurant created successfully" });
         }*/
        [HttpPost]
        public async Task<IActionResult> CreateRestaurant([FromBody] Restaurant restaurant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Hash the password using BCrypt
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(restaurant.Password);

                using (var cn = new MySqlConnection(_connectionString))
                {
                    cn.Open();
                    using (var cmd = new MySqlCommand("INSERT INTO Restaurant (RestaurantName, OwnersName, LicenseNumber, PhoneNumber, Email, Password) VALUES (@RestaurantName, @OwnersName, @LicenseNumber, @PhoneNumber, @Email, @Password)", cn))
                    {
                        cmd.Parameters.AddWithValue("@RestaurantName", restaurant.RestaurantName);
                        cmd.Parameters.AddWithValue("@OwnersName", restaurant.OwnersName);
                        cmd.Parameters.AddWithValue("@LicenseNumber", restaurant.LicenseNumber);
                        cmd.Parameters.AddWithValue("@PhoneNumber", restaurant.PhoneNumber);
                        cmd.Parameters.AddWithValue("@Email", restaurant.Email);
                        cmd.Parameters.AddWithValue("@Password", hashedPassword); // Store the hashed password

                        await cmd.ExecuteNonQueryAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }

            return Ok(new { message = "Restaurant created successfully" });
        }

        // PUT: api/Restaurants/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRestaurant(int id, [FromBody] Restaurant restaurant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using (var cn = new MySqlConnection(_connectionString))
                {
                    cn.Open();
                    using (var cmd = new MySqlCommand("UPDATE Restaurant SET RestaurantName = @RestaurantName, OwnersName = @OwnersName, LicenseNumber = @LicenseNumber, PhoneNumber = @PhoneNumber, Email = @Email, Password = @Password WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);
                        cmd.Parameters.AddWithValue("@RestaurantName", restaurant.RestaurantName);
                        cmd.Parameters.AddWithValue("@OwnersName", restaurant.OwnersName);
                        cmd.Parameters.AddWithValue("@LicenseNumber", restaurant.LicenseNumber);
                        cmd.Parameters.AddWithValue("@PhoneNumber", restaurant.PhoneNumber);
                        cmd.Parameters.AddWithValue("@Email", restaurant.Email);
                        cmd.Parameters.AddWithValue("@Password", restaurant.Password);

                        var rowsAffected = await cmd.ExecuteNonQueryAsync();
                        if (rowsAffected == 0)
                        {
                            return NotFound(new { message = "Restaurant not found" });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }

            return Ok(new { message = "Restaurant updated successfully" });
        }

        // DELETE: api/Restaurants/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurant(int id)
        {
            try
            {
                using (var cn = new MySqlConnection(_connectionString))
                {
                    cn.Open();
                    using (var cmd = new MySqlCommand("DELETE FROM Restaurant WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);

                        var rowsAffected = await cmd.ExecuteNonQueryAsync();
                        if (rowsAffected == 0)
                        {
                            return NotFound(new { message = "Restaurant not found" });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }

            return Ok(new { message = "Restaurant deleted successfully" });
        }
    }
}
