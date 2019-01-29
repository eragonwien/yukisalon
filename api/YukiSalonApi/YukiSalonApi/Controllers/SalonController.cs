using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YukiSalonApi.Models;
using YukiSalonApi.Services;

namespace YukiSalonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SalonController : ControllerBase
    {
        private readonly ISalonRepository<Salon> salonRepository;

        public SalonController(ISalonRepository<Salon> salonRepository)
        {
            this.salonRepository = salonRepository;
        }

        // GET: api/Salon
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var salonList = await salonRepository.GetAll();

            return Ok(salonList);
        }

        // GET: api/Salon/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetOne([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id == 0) // Wenn id ist zero, find the only active salon
            {
                try
                {
                    id = salonRepository.GetFirstId();
                }
                catch (Exception)
                {
                    return NotFound();
                };
            }

            var salon = salonRepository.GetOne(id);

            if (salon == null)
            {
                return NotFound();
            }

            return Ok(salon);
        }

        // POST: api/Salon
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Salon salon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                salonRepository.Add(salon);
                await salonRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            return CreatedAtAction(nameof(GetOne), new { id = salon.Id }, salon);
        }

        // PUT: api/Salon/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Salon salon)
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
                salonRepository.Update(salon);
                await salonRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!salonRepository.Exist(id))
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

        // DELETE: api/Salon/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            salonRepository.Remove(id);
            await salonRepository.SaveChanges();

            return Ok(id);
        }

        // GET: api/Salon/5/Subcategories
        [HttpGet("{id}/Subcategories")]
        public async Task<IActionResult> GetSubCategories([FromRoute] int id)
        {
            var subcategories = await salonRepository.GetSubcategories(id);

            return Ok(subcategories);
        }
    }
}