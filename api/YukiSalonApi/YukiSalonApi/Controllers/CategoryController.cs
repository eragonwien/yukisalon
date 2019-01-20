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
    public class CategoryController : ControllerBase
    {
        private readonly YUKISALONDEVContext context;

        public CategoryController(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] int id, [FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.Id)
            {
                return BadRequest();
            }

            try
            {
                context.Entry(category).Property(c => c.Name).IsModified = true;
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!CategoryExists(id))
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

        // POST: api/Category
        [HttpPost]
        public async Task<IActionResult> PostCategory([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                context.Category.Add(category);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (CategoryExists(category.Name))
                {
                    ModelState.AddModelError("Name", "Diese Name existiert bereits");
                    return BadRequest(ModelState);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = await context.Category.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            context.Category.Remove(category);
            await context.SaveChangesAsync();

            return Ok(category);
        }

        private bool CategoryExists(int id)
        {
            return context.Category.Any(e => e.Id == id);
        }

        private bool CategoryExists(string name)
        {
            return context.Category.Any(e => e.Name == name);
        }
    }
}