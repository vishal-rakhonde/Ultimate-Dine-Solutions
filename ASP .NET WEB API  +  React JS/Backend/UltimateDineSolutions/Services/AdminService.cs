using UltimateDineSolutions.Data;
using UltimateDineSolutions.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace UltimateDineSolutions.Services
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterAdminAsync(Admin admin)
        {
            // Validate if the username already exists
            var existingAdmin = await _context.Usermaster
                .FirstOrDefaultAsync(a => a.email == admin.email);

            if (existingAdmin != null)
                return false; // Username already exists

            // Hash the password (use a strong hash function in a production scenario)
            admin.Password = HashPassword(admin.Password);

            // Add the new admin to the database
            await _context.Admin.AddAsync(admin);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<(bool, string)> LoginAdminAsync(string username, string password)
        {
            var admin = await _context.Admin
                .FirstOrDefaultAsync(a => a.email == username);

            if (admin == null || !VerifyPassword(admin.Password, password))
                return (false, null);

            // Generate JWT token or any other token
            var token = GenerateJwtToken(admin); // Implement this method to generate JWT

            return (true, token);
        }

        private string HashPassword(string password)
        {
            // A simple hash example. Use a better hashing strategy in production
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private bool VerifyPassword(string storedPasswordHash, string password)
        {
            var passwordHash = HashPassword(password);
            return passwordHash == storedPasswordHash;
        }

        private string GenerateJwtToken(Admin admin)
        {
            // Implement JWT token generation logic here
            // For example, using the System.IdentityModel.Tokens.Jwt library
            return "dummyToken"; // Replace with actual token generation logic
        }
    }
}
