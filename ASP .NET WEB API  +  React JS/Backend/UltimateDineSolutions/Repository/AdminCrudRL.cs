using Microsoft.CodeAnalysis.Scripting;
using MySqlConnector;
using System.Data;
using UltimateDineSolutions.Models;

namespace UltimateDineSolutions.Repository
{

    
    public class AdminCrudRL
    {
        public readonly IConfiguration _configuration;
        public readonly MySqlConnection _mySqlConnection;
        public AdminCrudRL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mySqlConnection = new MySqlConnection(_configuration["ConnectionStrings:DefaultConnection"]);
        }

        //public int login(Admin admin)
        //{
        //    try
        //    {
        //        if (_mySqlConnection.State != System.Data.ConnectionState.Open)
        //        {
        //             _mySqlConnection.Open();
        //        }
                
        //        using (MySqlCommand cmd = new MySqlCommand())
        //        {
                
        //            cmd.CommandType = CommandType.Text;
        //            cmd.CommandText = "SELECT Password FROM Admin WHERE Username = @Username";
        //            cmd.Parameters.AddWithValue("@Username", admin.Username);

        //            var storedHashedPassword = cmd.ExecuteScalar() as string;

        //            if (storedHashedPassword == null)
        //            {
        //                return -111;
        //                //return Unauthorized("Invalid username or password.");
        //            }

        //            // Verify the password
        //            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(admin.Password, storedHashedPassword);

        //            if (isPasswordValid)
        //            {
        //                return 1;
        //                //return Ok("Login successful.");
        //            }
        //            else
        //            {
        //                return -222;
        //                //return Unauthorized("Invalid username or password.");
        //            }
        //        }
                
        //    }
        //    catch (Exception ex)
        //    {
        //        return -333;
        //        // Log the exception details (e.g., using a logging framework)
        //        //return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //    finally
        //    {
        //        if(_mySqlConnection.State == System.Data.ConnectionState.Open)
        //        {
        //            _mySqlConnection.Close();
        //        }
        //    }
        //}
    }
}
