using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using YukiSalonApi.Models;
using YukiSalonApi.Resources;
using YukiSalonApi.Services;

namespace YukiSalonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository repository;
        private readonly ILogger<CategoryController> log;

        public CategoryController(ICategoryRepository repository, ILogger<CategoryController> log)
        {
            this.repository = repository;
            this.log = log;
        }

        public async Task<IActionResult> GetOne([FromRoute] int id)
        {
            Category category = await repository.GetOne(id);

            if (category == null)
            {
                return NoContent();
            }

            return Ok(category);
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.Id)
            {
                ModelState.AddModelError(nameof(category.Id), Translation.IdMismatch);
                return BadRequest();
            }

            try
            {
                repository.Update(category);
                await repository.SaveChanges();
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

            return Ok();
        }

        // POST: api/Category
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                repository.Add(category);
                await repository.SaveChanges();
            }
            catch (Exception ex)
            {
                if (repository.Exist(category.Name))
                {
                    ModelState.AddModelError(nameof(category.Name), Translation.NameAlreadyExists);
                    return BadRequest(ModelState);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            return CreatedAtAction(nameof(GetOne), new { id = category.Id }, category);
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                repository.Remove(id);
                await repository.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            return Ok(id);
        }
    }
}