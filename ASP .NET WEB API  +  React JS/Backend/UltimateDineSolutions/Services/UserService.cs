
using System.Collections.Generic;
using System.Linq;
using UltimateDineSolutions.Models;

namespace UltimateDineSolutions.Services
{
    public class UserService : IUserService
    {
        private readonly List<User> _users = new List<User>();

        public IEnumerable<User> GetAllUsers()
        {
            return _users;
        }

        public User GetUserById(int id)
        {
            return _users.FirstOrDefault(u => u.Id == id);
        }

        public User CreateUser(User user)
        {
            user.Id = _users.Count > 0 ? _users.Max(u => u.Id) + 1 : 1; // Simulate auto-increment
            _users.Add(user);
            return user;
        }

        public User UpdateUser(int id, User user)
        {
            var existingUser = GetUserById(id);
            if (existingUser != null)
            {
                existingUser.Name = user.Name;
                existingUser.Email = user.Email;
                existingUser.Mobile = user.Mobile;
                existingUser.Password = user.Password; // Consider hashing this
                existingUser.Gender = user.Gender;
                existingUser.Role = user.Role;
            }
            return existingUser;
        }

        public bool DeleteUser(int id)
        {
            var user = GetUserById(id);
            if (user != null)
            {
                _users.Remove(user);
                return true;
            }
            return false;
        }
    }
}

