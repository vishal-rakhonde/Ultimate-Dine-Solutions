using System.Security.Cryptography;
using System.Text;

namespace UltimateDineSolutions.Common
{
    
    public static class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        public static bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            var providedPasswordHash = HashPassword(providedPassword);
            return hashedPassword == providedPasswordHash;
        }
    }
}
