using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public class SalonRepository : ISalonRepository
    {
        private readonly YUKISALONDEVContext context;

        public SalonRepository(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        public Task Add(Salon salon)
        {
            context.Salon.Add(salon);
            return Task.CompletedTask;
        }

        public Task<List<Salon>> GetAll()
        {
            return context.Salon.ToListAsync();
        }

        public Salon GetOne(int id)
        {
            var salon = context.Salon
               .Include(s => s.Contact).ThenInclude(c => c.OpenHour)
               .Include(s => s.User)
               .Include(s => s.Category).ThenInclude(c => c.Subcategory).ThenInclude(sc => sc.Product)
               .Include(s => s.Category).ThenInclude(c => c.Product)
               .Where(s => s.Id == id)
               .FirstOrDefault();

            salon.Category = salon.Category
                .Where(c => !c.IsSubcategory || !c.IsSubcategory)
                .ToList();

            return salon;
        }

        public int GetFirstId()
        {
            return context.Salon.Where(s => s.IsActive && s.IsActive).Select(s => s.Id).First();
        }

        public Task Update(Salon salon)
        {
            context.Update(salon);
            return Task.CompletedTask;
        }

        public Task Remove(int salonId)
        {
            Salon salon = GetOne(salonId);
            if (salon != null)
            {
                salon.IsActive = false;
                Update(salon);
            }
            return Task.CompletedTask;
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
