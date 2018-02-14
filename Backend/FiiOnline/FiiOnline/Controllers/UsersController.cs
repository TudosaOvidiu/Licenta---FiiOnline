using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Business.Services.Interfaces;
using CreatingModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FiiOnline.Controllers
{
    [Produces("application/json")]
    [Route("/Users")]
    public class UsersController : Controller
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {

            var users = _usersService.GetAll();
            if (users == null)
                return NotFound("There are no users");
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUser([FromRoute] string id)
        {
            var user = _usersService.GetById(id);
            if (user == null)
                return NotFound("There is no user with that id");
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser([FromBody] UserCreatingModel userModel, [FromRoute] string id)
        {

            try
            {
                _usersService.Update(userModel, id);
                return StatusCode((int)HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUser([FromRoute] string id)
        {
            try
            {
                _usersService.Delete(id);
                return StatusCode((int)HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}