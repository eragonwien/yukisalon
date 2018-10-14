using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using yukisalon.Models;

namespace yukisalon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalonController : ControllerBase
    {
        private readonly YUKISALONDEVContext _context;

        public SalonController(YUKISALONDEVContext context)
        {
            _context = context;
        }

        // GET: api/Salon
        [HttpGet]
        public Salon GetSalon()
        {
            var salon = _context.Salon
                .Include(s => s.Contact).ThenInclude(c => c.OpenHour)
                .Include(s => s.User)
                .Include(s => s.Category)
                .First();

            return salon;
        }

        //// GET: api/Salon/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetSalon([FromRoute] int id)
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

        //    return Ok(salon);
        //}

        //// PUT: api/Salon/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutSalon([FromRoute] int id, [FromBody] Salon salon)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != salon.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(salon).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!SalonExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

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
            return _context.Salon.Any(e => e.Id == id);
        }
    }
}