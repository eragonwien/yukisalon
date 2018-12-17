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
    public class ContactController : ControllerBase
    {
        private readonly YUKISALONDEVContext context;

        public ContactController(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        //// GET: api/Contact
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Contact/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Contact
        [HttpPost]
        public async Task<IActionResult> CreateNewContact([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                context.Contact.Add(contact);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: api/Contact/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContactById([FromRoute] int id, [FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.Id)
            {
                return BadRequest();
            }

            try
            {
                context.Entry(contact).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalonContactExists(contact.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            return Ok();
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
                Contact removeContact = await context.Contact.Where(c => c.Id == id).SingleOrDefaultAsync();
                int salonContactCount = await context.Contact.Where(c => c.SalonId == removeContact.SalonId).CountAsync();

                if (salonContactCount == 1)
                {
                    return BadRequest("Ein Salon muss mindesten ein Kontakt haben.");
                }

                if (removeContact != null)
                {
                    context.Contact.Remove(removeContact);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            return Ok();
        }

        private bool SalonContactExists(int id)
        {
            return context.Contact.Any(c => c.Id == id);
        }

        private bool SalonContactExists(Contact contact)
        {
            return context.Contact.Any(c => c.Address1 == contact.Address1 && c.Address2 == contact.Address2 && c.Plz == contact.Plz && c.City == contact.City);
        }
    }
}
