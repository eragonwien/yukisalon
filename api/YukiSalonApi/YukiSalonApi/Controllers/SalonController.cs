using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YukiSalonApi.Models;

namespace YukiSalonApi.Controllers
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
               .Include(s => s.Category).ThenInclude(c => c.Subcategory).ThenInclude(sc => sc.Product)
               .Include(s => s.Category).ThenInclude(c => c.Product)
               .Where(s => s.Id == id)
               .FirstOrDefaultAsync();

            salon.Category = salon.Category
                .Where(c => !c.IsSubcategory.HasValue || !c.IsSubcategory.Value)
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

        // PUT: api/Salon/5
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
                context.Update(salon);
                context.Update(salon.Welcome);
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

            return NoContent();
        }

        // GET: api/Salon/5/Subcategories
        [HttpGet("{id}/Subcategories")]
        public async Task<IActionResult> GetSalonSubCategories([FromRoute] int id)
        {
            var subcategories = await context.Category
                .Where(c => c.SalonId == id && (c.IsSubcategory == true))
                .Include(c => c.Product)
                .OrderBy(c => c.Name)
                .ToListAsync();

            return Ok(subcategories);
        }

        private bool SalonExists(int id)
        {
            return context.Salon.Any(e => e.Id == id);
        }
    }
}