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
    public class SalonController : ControllerBase
    {
        private readonly YUKISALONDEVContext context;

        public SalonController(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        // GET: api/Salon
        [HttpGet]
        public async Task<IActionResult> GetSalon()
        {
            var salonList = await context.Salon.ToListAsync();

            return Ok(salonList);
        }

        // GET: api/Salon/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSalon([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id == 0) // Wenn id ist zero, find the only active salon
            {
                try
                {
                    id = context.Salon.Where(s => s.IsActive.HasValue && s.IsActive.Value).Single().Id;
                }
                catch (Exception)
                {
                    return NotFound();
                };
            }

            var salon = await context.Salon
               .Include(s => s.Welcome)
               .Include(s => s.Contact).ThenInclude(c => c.OpenHour)
               .Include(s => s.User)
               .Include(s => s.Category).ThenInclude(c => c.SubCategory).ThenInclude(sc => sc.Product)
               .Include(s => s.Category).ThenInclude(c => c.Product)
               .Where(s => s.Id == id)
               .FirstOrDefaultAsync();

            salon.Category = salon.Category
                .Where(c => c.ParentId == null)
                .ToList();

            foreach (var user in salon.User)
            {
                user.Password = string.Empty;
            }

            if (salon == null)
            {
                return NotFound();
            }

            return Ok(salon);
        }

        // PUT: api/Salon/5/General
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSalon([FromRoute] int id, [FromBody] Salon salon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != salon.Id)
            {
                return BadRequest();
            }


            try
            {
                SetModelForModification(salon);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalonExists(id))
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

        private void SetModelForModification(Salon salon)
        {
            context.Entry(salon).Property(s => s.Name).IsModified = true;
            context.Entry(salon).Property(s => s.Description).IsModified = true;
            context.Entry(salon).Property(s => s.ExtraInfo).IsModified = true;
            context.Entry(salon).Property(s => s.IsActive).IsModified = true;
            context.Entry(salon.Welcome).State = EntityState.Modified;
        }

        //// POST: api/Salon
        //[HttpPost]
        //public async Task<IActionResult> PostSalon([FromBody] Salon salon)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.Salon.Add(salon);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetSalon", new { id = salon.Id }, salon);
        //}

        //// DELETE: api/Salon/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteSalon([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var salon = await _context.Salon.FindAsync(id);
        //    if (salon == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Salon.Remove(salon);
        //    await _context.SaveChangesAsync();

        //    return Ok(salon);
        //}

        private bool SalonExists(int id)
        {
            return context.Salon.Any(e => e.Id == id);
        }

       
    }
}