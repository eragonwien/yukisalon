using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yukisalon.Models;

namespace yukisalon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly YUKISALONDEVContext context;

        public UserController(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        //// GET: api/User
        //[HttpGet]
        //public IEnumerable<User> GetUser()
        //{
        //    return context.User;
        //}

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            try
            {
                SetUserModified(user);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            return Ok();
        }

        private void SetUserModified(User user)
        {
            context.Entry(user).Property(u => u.Name).IsModified = true;
            context.Entry(user).Property(u => u.Description).IsModified = true;
            context.Entry(user).Property(u => u.IsDisplayed).IsModified = true;
            context.Entry(user).Property(u => u.IsActive).IsModified = true;
            context.Entry(user).Property(u => u.Email).IsModified = true;
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (user.RoleId < 0)
            {
                user.RoleId = context.Role.First().Id;
            }

            try
            {
                context.User.Add(user);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (UserExists(user.Email))
                {
                    ModelState.AddModelError("Email", "Benutzer existiert bereits");
                    return BadRequest(ModelState);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            if (User.Identity.Name.Equals(user.Email))
            {
                ModelState.AddModelError("", string.Format("{0} kann sich selbst nicht löschen", user.Name));
                return BadRequest(ModelState);
            }

            int userCount = await context.User.CountAsync(u => u.SalonId == user.SalonId);
            if (userCount <= 1)
            {
                ModelState.AddModelError("", string.Format("{0} ist der einzige Benutzer und darf daher nicht gelöscht werden.", user.Name));
                return BadRequest(ModelState);
            }

            context.User.Remove(user);
            await context.SaveChangesAsync();

            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return context.User.Any(e => e.Id == id);
        }

        private bool UserExists(string email)
        {
            return context.User.Any(e => e.Email.Equals(email));
        }
    }
}