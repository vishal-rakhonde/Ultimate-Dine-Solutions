using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration; // Include this
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UltimateDineSolutions.Common;
using UltimateDineSolutions.Data;
using UltimateDineSolutions.Models;

namespace UltimateDineSolutions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AdminController> _logger;
        private readonly IConfiguration _configuration; // Added this

        public AdminController(ApplicationDbContext context, ILogger<AdminController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration; // Initialize the configuration
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] Usermaster usermaster)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                usermaster.Password = PasswordHasher.HashPassword(usermaster.Password);

                _context.Usermaster.Add(usermaster);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Internal Server Error" });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] AdminLoginRequest request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Login request data is null." });
            }

            if (string.IsNullOrEmpty(request.username) || string.IsNullOrEmpty(request.password))
            {
                return BadRequest(new { message = "Username and password cannot be empty." });
            }

            try
            {
                using (MySqlConnection cn = new MySqlConnection("server=localhost;user=root;password=cdac;database=ultimatedinesolutions"))
                {
                    cn.Open();

                    using (MySqlCommand cmd = new MySqlCommand("SELECT Password, Role FROM restaurant WHERE Email = @username", cn))
                    {
                        cmd.Parameters.AddWithValue("@username", request.username);

                        using (MySqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                var storedHashedPassword = reader["Password"].ToString();
                                var role = reader["Role"].ToString();

                                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.password, storedHashedPassword);

                                if (isPasswordValid)
                                {
                                    var tokenHandler = new JwtSecurityTokenHandler();
                                    var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]); // Use _configuration
                                    var tokenDescriptor = new SecurityTokenDescriptor
                                    {
                                        Subject = new ClaimsIdentity(new[]
                                        {
                                            new Claim(ClaimTypes.Name, request.username),
                                            new Claim(ClaimTypes.Role, role)
                                        }),
                                        Expires = DateTime.UtcNow.AddHours(1),
                                        Issuer = _configuration["Jwt:Issuer"], // Use _configuration
                                        Audience = _configuration["Jwt:Audience"], // Use _configuration
                                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                                    };

                                    var token = tokenHandler.CreateToken(tokenDescriptor);
                                    var tokenString = tokenHandler.WriteToken(token);

                                    return Ok(new
                                    {
                                        message = "Login successful.",
                                        token = tokenString,
                                        role = role
                                    });
                                }
                                else
                                {
                                    return Unauthorized(new { message = "Invalid username or password." });
                                }
                            }
                            else
                            {
                                return Unauthorized(new { message = "Invalid email or password." });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPost("addFood")]
        public ActionResult<FoodItem> AddNewFoodItem([FromBody] FoodItem foodItem)
        {
            if (foodItem == null)
            {
                return BadRequest();
            }

            _context.FoodItems.Add(foodItem);
            _context.SaveChanges();

            return CreatedAtAction(nameof(AddNewFoodItem), new { id = foodItem.Id }, foodItem);
        }

        [HttpPut("updateFood/{id}")]
        public ActionResult<FoodItem> UpdateFoodItem(int id, [FromBody] FoodItem updatedFoodItem)
        {
            if (updatedFoodItem == null || id != updatedFoodItem.Id)
            {
                return BadRequest();
            }

            var existingFoodItem = _context.FoodItems.Find(id);
            if (existingFoodItem == null)
            {
                return NotFound(new { message = "Food item not found" });
            }

            existingFoodItem.FoodItemName = updatedFoodItem.FoodItemName;
            existingFoodItem.Price = updatedFoodItem.Price;
            existingFoodItem.Category = updatedFoodItem.Category;

            _context.FoodItems.Update(existingFoodItem);
            _context.SaveChanges();

            return Ok(existingFoodItem);
        }

        [HttpDelete("deleteFoodItem/{id}")]
        public ActionResult DeleteFoodItem(int id)
        {
            var foodItem = _context.FoodItems.Find(id);
            if (foodItem == null)
            {
                return NotFound(new { message = "Food item not found" });
            }

            _context.FoodItems.Remove(foodItem);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("GetOrderDetails/{id}")]
        public ActionResult<OrderDetailsItemResponse> GetOrder(int orderId)
        {
            OrderDetailsItemResponse orderDetailsItemResponse = new OrderDetailsItemResponse();

            var order = _context.OrderDetails.Where(x => x.OrderId == orderId).FirstOrDefault();
            orderDetailsItemResponse.OrderId = order.OrderId;
            orderDetailsItemResponse.GuestName = order.GuestName;
            orderDetailsItemResponse.DateTime = order.DateTime;

            List<OrderDetailsItem> orderDetailsItemList1 = new List<OrderDetailsItem>();

            if (order == null)
            {
                return NotFound();
            }

            var orderdetailsItem = _context.OrderDetailsItems.Where(x => x.OrderId == orderId).ToList();

            if (orderdetailsItem == null)
            {
                return NotFound();
            }

            foreach (var item in orderdetailsItem)
            {
                OrderDetailsItem orderDetailsItem1 = new OrderDetailsItem();
                orderDetailsItem1.OrderDetailsItemId = item.OrderDetailsItemId;
                orderDetailsItem1.OrderId = item.OrderId;
                orderDetailsItem1.FoodItemId = item.FoodItemId;
                orderDetailsItem1.Quantity = item.Quantity;

                orderDetailsItemList1.Add(orderDetailsItem1);
            }
            orderDetailsItemResponse.orderDetailsItems = orderDetailsItemList1;

            return Ok(orderDetailsItemResponse);
        }

        public class AdminLoginRequest
        {
            public string username { get; set; }
            public string password { get; set; }
        }
    }
}
