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
    public class ContactController : ControllerBase
    {
        private readonly IContactRepository repository;
        private readonly ILogger<ContactController> log;

        public ContactController(IContactRepository repository, ILogger<ContactController> log)
        {
            this.repository = repository;
            this.log = log;
        }

        // GET: api/Contact/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            Contact contact = await repository.GetOne(id);

            if (contact == null)
            {
                return NoContent();
            }

            return Ok(contact);
        }

        // POST: api/Contact
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                repository.Add(contact);
                await repository.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            return CreatedAtAction(nameof(GetOne), new { id = contact.Id }, contact);
        }

        // PUT: api/Contact/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.Id)
            {
                ModelState.AddModelError(nameof(contact.Id), Translation.IdMismatch);
                return BadRequest(ModelState);
            }

            try
            {
                repository.Update(contact);
                await repository.SaveChanges();
            }
            catch (Exception ex)
            {
                if (!repository.Exist(contact.Id))
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

        // DELETE: api/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                string errMsg = repository.Remove(id);

                if (!string.IsNullOrEmpty(errMsg))
                {
                    ModelState.AddModelError("", errMsg);
                    return BadRequest(ModelState);    
                }

                await repository.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            return Ok();
        }
    }
}