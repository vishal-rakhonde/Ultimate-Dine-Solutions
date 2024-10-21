
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using UltimateDineSolutions.Models;
using UltimateDineSolutions.Services;

namespace UltimateDineSolutions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/user
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/user
        [HttpPost]
        public ActionResult<User> CreateUser(User user)
        {
            var createdUser = _userService.CreateUser(user);
            return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User updatedUser)
        {
            var user = _userService.UpdateUser(id, updatedUser);
            if (user == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (!_userService.DeleteUser(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
