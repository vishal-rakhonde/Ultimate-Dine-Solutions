using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using UltimateDineSolutions.Models;

[Route("api/[controller]")]
[ApiController]
public class DishesController : ControllerBase
{
    private readonly string _connectionString = "server=localhost;user=root;password=cdac;database=ultimatedinesolutions";

    // GET: api/Dishes
    [HttpGet]
    public async Task<IActionResult> GetDishes()
    {
        var dishes = new List<Dish>();

        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("SELECT Id, Name, Description, Price, Category, Image FROM Dish", cn))
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        dishes.Add(new Dish
                        {
                            Id = reader.GetInt32("Id"),
                            Name = reader.GetString("Name"),
                            Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
                            Price = reader.GetDecimal("Price"),
                            Category = reader.IsDBNull("Category") ? null : reader.GetString("Category"),
                            image = reader.IsDBNull("Image") ? null : reader.GetString("Image")
                        });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
        }

        return Ok(dishes);
    }

    // GET: api/Dishes/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDish(int id)
    {
        Dish dish = null;

        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("SELECT Id, Name, Description, Price, Category, Image FROM Dish WHERE Id = @id", cn))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            dish = new Dish
                            {
                                Id = reader.GetInt32("Id"),
                                Name = reader.GetString("Name"),
                                Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
                                Price = reader.GetDecimal("Price"),
                                Category = reader.IsDBNull("Category") ? null : reader.GetString("Category"),
                                image = reader.IsDBNull("image") ? null : reader.GetString("image")
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

        if (dish == null)
        {
            return NotFound(new { message = "Dish not found." });
        }

        return Ok(dish);
    }

    // POST: api/Dishes
    [HttpPost]
    public async Task<IActionResult> PostDish([FromBody] Dish dish)
    {
        if (dish == null)
        {
            return BadRequest(new { message = "Dish data is null." });
        }

        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("INSERT INTO Dish (Name, Description, Price, Category, Image) VALUES (@Name, @Description, @Price, @Category, @Image)", cn))
                {
                    cmd.Parameters.AddWithValue("@Name", dish.Name);
                    cmd.Parameters.AddWithValue("@Description", (object)dish.Description ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@Price", dish.Price);
                    cmd.Parameters.AddWithValue("@Category", (object)dish.Category ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@Image", (object)dish.image ?? DBNull.Value);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
        }

        return CreatedAtAction(nameof(GetDish), new { id = dish.Id }, dish);
    }

    // PUT: api/Dishes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDish(int id, [FromBody] Dish dish)
    {
        if (dish == null || dish.Id != id)
        {
            return BadRequest(new { message = "Dish data is invalid." });
        }

        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("UPDATE Dish SET Name = @Name, Description = @Description, Price = @Price, Category = @Category, Image = @Image WHERE Id = @Id", cn))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.Parameters.AddWithValue("@Name", dish.Name);
                    cmd.Parameters.AddWithValue("@Description", (object)dish.Description ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@Price", dish.Price);
                    cmd.Parameters.AddWithValue("@Category", (object)dish.Category ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@Image", (object)dish.image ?? DBNull.Value);

                    var rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected == 0)
                    {
                        return NotFound(new { message = "Dish not found." });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
        }

        return NoContent();
    }

    // DELETE: api/Dishes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDish(int id)
    {
        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("DELETE FROM Dish WHERE Id = @Id", cn))
                {
                    cmd.Parameters.AddWithValue("@Id", id);

                    var rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected == 0)
                    {
                        return NotFound(new { message = "Dish not found." });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
        }

        return NoContent();
    }
}

/*using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using UltimateDineSolutions.Models;

[Route("api/[controller]")]
[ApiController]
public class DishesController : ControllerBase
{
    private readonly string _connectionString = "server=localhost;user=root;password=cdac;database=ultimatedinesolutions";

    // GET: api/Dishes
    [HttpGet]
    public async Task<IActionResult> GetDishes()
    {
        var dishes = new List<Dish>();

        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("SELECT Id, Name, Description, Price, Category FROM Dish", cn))
                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        dishes.Add(new Dish
                        {
                            Id = reader.GetInt32("Id"),
                            Name = reader.GetString("Name"),
                            Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
                            Price = reader.GetDecimal("Price"),
                            Category = reader.IsDBNull("Category") ? null : reader.GetString("Category")
                        });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
        }

        return Ok(dishes);
    }

    // GET: api/Dishes/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDish(int id)
    {
        Dish dish = null;

        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("SELECT Id, Name, Description, Price, Category FROM Dish WHERE Id = @id", cn))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            dish = new Dish
                            {
                                Id = reader.GetInt32("Id"),
                                Name = reader.GetString("Name"),
                                Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
                                Price = reader.GetDecimal("Price"),
                                Category = reader.IsDBNull("Category") ? null : reader.GetString("Category")
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

        if (dish == null)
        {
            return NotFound(new { message = "Dish not found." });
        }

        return Ok(dish);
    }

    // POST: api/Dishes
    [HttpPost]
    public async Task<IActionResult> PostDish([FromBody] Dish dish)
    {
        if (dish == null)
        {
            return BadRequest(new { message = "Dish data is null." });
        }

        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("INSERT INTO Dish (Name, Description, Price, Category) VALUES (@Name, @Description, @Price, @Category)", cn))
                {
                    cmd.Parameters.AddWithValue("@Name", dish.Name);
                    cmd.Parameters.AddWithValue("@Description", (object)dish.Description ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@Price", dish.Price);
                    cmd.Parameters.AddWithValue("@Category", (object)dish.Category ?? DBNull.Value);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
        }

        return CreatedAtAction(nameof(GetDish), new { id = dish.Id }, dish);
    }

    // PUT: api/Dishes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDish(int id, [FromBody] Dish dish)
    {
        if (dish == null || dish.Id != id)
        {
            return BadRequest(new { message = "Dish data is invalid." });
        }

        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("UPDATE Dish SET Name = @Name, Description = @Description, Price = @Price, Category = @Category WHERE Id = @Id", cn))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.Parameters.AddWithValue("@Name", dish.Name);
                    cmd.Parameters.AddWithValue("@Description", (object)dish.Description ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@Price", dish.Price);
                    cmd.Parameters.AddWithValue("@Category", (object)dish.Category ?? DBNull.Value);

                    var rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected == 0)
                    {
                        return NotFound(new { message = "Dish not found." });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
        }

        return NoContent();
    }

    // DELETE: api/Dishes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDish(int id)
    {
        try
        {
            using (var cn = new MySqlConnection(_connectionString))
            {
                cn.Open();
                using (var cmd = new MySqlCommand("DELETE FROM Dish WHERE Id = @Id", cn))
                {
                    cmd.Parameters.AddWithValue("@Id", id);

                    var rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected == 0)
                    {
                        return NotFound(new { message = "Dish not found." });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
        }

        return NoContent();
    }
}

*/