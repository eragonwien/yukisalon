using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YukiSalonApi.Models;

namespace YukiSalonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenHourController : ControllerBase
    {
        private readonly YUKISALONDEVContext _context;

        public OpenHourController(YUKISALONDEVContext context)
        {
            _context = context;
        }

        // GET: api/OpenHour
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OpenHour>>> GetOpenHour()
        {
            return await _context.OpenHour.ToListAsync();
        }

        // GET: api/OpenHour/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OpenHour>> GetOpenHour(int id)
        {
            var openHour = await _context.OpenHour.FindAsync(id);

            if (openHour == null)
            {
                return NotFound();
            }

            return openHour;
        }

        // PUT: api/OpenHour/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOpenHour(int id, OpenHour openHour)
        {
            if (id != openHour.Id)
            {
                return BadRequest();
            }

            _context.Entry(openHour).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OpenHourExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OpenHour
        [HttpPost]
        public async Task<ActionResult<OpenHour>> PostOpenHour(OpenHour openHour)
        {
            _context.OpenHour.Add(openHour);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOpenHour", new { id = openHour.Id }, openHour);
        }

        // DELETE: api/OpenHour/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OpenHour>> DeleteOpenHour(int id)
        {
            var openHour = await _context.OpenHour.FindAsync(id);
            if (openHour == null)
            {
                return NotFound();
            }

            _context.OpenHour.Remove(openHour);
            await _context.SaveChangesAsync();

            return openHour;
        }

        private bool OpenHourExists(int id)
        {
            return _context.OpenHour.Any(e => e.Id == id);
        }
    }
}
