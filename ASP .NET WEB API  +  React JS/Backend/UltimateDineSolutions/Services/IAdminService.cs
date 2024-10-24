using UltimateDineSolutions.Models;

namespace UltimateDineSolutions.Services
{
    public interface IAdminService
    {
        Task<bool> RegisterAdminAsync(Admin admin);
        Task<(bool Success, string Token)> LoginAdminAsync(string username, string password);
    }
}
