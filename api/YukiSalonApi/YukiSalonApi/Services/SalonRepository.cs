using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public class SalonRepository : ISalonRepository<Salon>
    {
        private readonly YUKISALONDEVContext context;

        public SalonRepository(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        public void Add(Salon salon)
        {
            context.Salon.Add(salon);
        }

        public Task<List<Salon>> GetAll()
        {
            return context.Salon.ToListAsync();
        }

        public Salon GetOne(int id)
        {
            var salon = context.Salon
               .Include(s => s.Welcome)
               .Include(s => s.Contact).ThenInclude(c => c.OpenHour)
               .Include(s => s.User)
               .Include(s => s.Category).ThenInclude(c => c.Subcategory).ThenInclude(sc => sc.Product)
               .Include(s => s.Category).ThenInclude(c => c.Product)
               .Where(s => s.Id == id)
               .FirstOrDefault();

            salon.Category = salon.Category
                .Where(c => !c.IsSubcategory.HasValue || !c.IsSubcategory.Value)
                .ToList();

            return salon;
        }

        public Task<List<Category>> GetSubcategories(int salonId)
        {
            return context.Category
                .Where(c => c.SalonId == salonId && (c.IsSubcategory == true))
                .Include(c => c.Product)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }

        public int GetFirstId()
        {
            return context.Salon.Where(s => s.IsActive.HasValue && s.IsActive.Value).Select(s => s.Id).First();
        }

        public void Update(Salon salon)
        {
            context.Update(salon);
        }

        public void Remove(int salonId)
        {
            var salon = new Salon() { Id = salonId };
            context.Salon.Attach(salon);
            context.Salon.Remove(salon);
        }

        public Task SaveChanges()
        {
            return context.SaveChangesAsync();
        }

        public bool Exist(int salonId)
        {
            return context.Salon.Any(e => e.Id == salonId);
        }
    }
}
