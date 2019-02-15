using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly YUKISALONDEVContext context;

        public CategoryRepository(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        public Task Add(Category category)
        {
            context.Category.Add(category);
            return Task.CompletedTask;
        }

        public bool Exist(int id)
        {
            return context.Category.Any(c => c.Id == id && c.IsActive);
        }

        public bool Exist(string name)
        {
            return context.Category.Any(c => c.Name.Equals(name) && c.IsActive);
        }

        public Task<List<Category>> GetAll(int salonId = -1, bool subcategoryOnly = false)
        {
            var categories = context.Category
                .Where(c => c.IsActive && (salonId < 0 || c.SalonId == salonId) && (subcategoryOnly || c.IsSubcategory));

            return categories.ToListAsync();
        }

        public Task<Category> GetOne(int id)
        {
            return context.Category.SingleOrDefaultAsync(c => c.Id == id && c.IsActive);
        }

        public async Task Remove(int id)
        {
            Category category = await GetOne(id);
            if (category != null)
            {
                category.IsActive = false;
                await Update(category);
            }
        }

        public Task SaveChanges()
        {
            return context.SaveChangesAsync();
        }

        public Task Update(Category category)
        {
            context.Update(category);
            return Task.CompletedTask;
        }

        public Task<List<Category>> GetSubcategories(int salonId)
        {
            return context.Category
                .Where(c => c.SalonId == salonId && (c.IsSubcategory == true))
                .Include(c => c.Product)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }
    }
}
