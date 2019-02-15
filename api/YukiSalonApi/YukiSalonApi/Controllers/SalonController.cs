using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YukiSalonApi.Models;
using YukiSalonApi.Resources;
using YukiSalonApi.Services;

namespace YukiSalonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SalonController : ControllerBase
    {
        private readonly ISalonRepository salonRepository;
        private readonly ILogger<SalonController> log;

        public SalonController(ISalonRepository salonRepository, ILogger<SalonController> logger)
        {
            this.salonRepository = salonRepository;
            this.log = logger;
        }

        // GET: api/Salon
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var salonList = await salonRepository.GetAll();

            if (salonList == null || salonList.Count == 0)
            {
                return NoContent();
            }

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
                catch (Exception ex)
                {
                    log.LogError("[GET: api/Salon/{0}] {1}", id, ex.Message);
                    return NoContent();
                };
            }

            var salon = salonRepository.GetOne(id);

            if (salon == null)
            {
                return NoContent();
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
                await salonRepository.Add(salon);
                await salonRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                log.LogError("[POST: api/Salon] {0}", ex.Message);
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
                ModelState.AddModelError(nameof(salon.Id), Translation.IdMismatch);
                return BadRequest(ModelState);
            }

            try
            {
                await salonRepository.Update(salon);
                await salonRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                if (!salonRepository.Exist(id))
                {
                    return NotFound();
                }
                log.LogError("[POST: PUT: api/Salon/{0}] {1}", id, ex.Message);
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

            await salonRepository.Remove(id);
            await salonRepository.SaveChanges();

            return Ok(id);
        }
    }
}