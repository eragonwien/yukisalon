using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using YukiSalonApi.Models;
using YukiSalonApi.Resources;
using YukiSalonApi.Services;

namespace YukiSalonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository repository;
        private readonly ILogger<UserController> log;

        public UserController(IUserRepository repository, ILogger<UserController> log)
        {
            this.repository = repository;
            this.log = log;
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne([FromRoute] int id)
        {
            try
            {
                User user = await repository.GetOne(id);

                if (user == null)
                {
                    return NoContent();
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                ModelState.AddModelError(nameof(user.Id), Translation.IdMismatch);
                return BadRequest();
            }

            try
            {
                repository.Update(user);
                await repository.SaveChanges();
            }
            catch (Exception ex)
            {
                if (!repository.Exist(id))
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            return NoContent();
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                repository.Add(user);
                await repository.SaveChanges();
            }
            catch (Exception ex)
            {
                if (repository.Exist(user))
                {
                    ModelState.AddModelError(nameof(user.Email), Translation.EmailAlreadyExists);
                    return BadRequest(ModelState);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            return CreatedAtAction(nameof(GetOne), new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                string errorMessage = repository.Remove(id);

                if (!string.IsNullOrEmpty(errorMessage))
                {
                    ModelState.AddModelError("", errorMessage);
                    return BadRequest(ModelState);
                }

                await repository.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            
            return Ok(id);
        }
    }
}