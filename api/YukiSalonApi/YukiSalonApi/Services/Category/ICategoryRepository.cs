using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAll(int salonId, bool subcategoryOnly);
        Task<Category> GetOne(int id);
        Task Add(Category category);
        Task Update(Category category);
        Task Remove(int id);
        Task SaveChanges();
        bool Exist(int id);
        bool Exist(string name);
    }
}
