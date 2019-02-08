using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YukiSalonApi.Models;
using YukiSalonApi.Resources;
using YukiSalonApi.Services;

namespace YukiSalonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository repository;

        public ImageController(IImageRepository imageRepository)
        {
            this.repository = imageRepository;
        }

        // GET: api/Image
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var imageList = await repository.GetAll();
            return Ok(imageList);
        }

        // GET: api/Image/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetOne(int id)
        {
            var image = await repository.GetOne(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }

        // PUT: api/Image/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Image image)
        {
            if (id != image.Id)
            {
                ModelState.AddModelError(nameof(image.Id), Translation.IdMismatch);
                return BadRequest(ModelState);
            }

            try
            {
                repository.Update(image);
                await repository.SaveChanges();
                await repository.SaveInDisk(image);
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

        // POST: api/Image
        [HttpPost]
        public async Task<ActionResult<Image>> Create(Image image)
        {
            try
            {
                repository.Add(image);
                await repository.SaveChanges();
                await repository.SaveInDisk(image);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            return CreatedAtAction(nameof(GetOne), new { id = image.Id }, image);
        }

        // DELETE: api/Image/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                repository.Remove(id);
                await repository.SaveChanges();
                await repository.RemoveFromDisk(id, true);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            return Ok(id);
        }
    }
}
