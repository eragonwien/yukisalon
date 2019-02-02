using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAll();
        Task<Category> GetOne(int id);
        void Add(Category catgory);
        void Update(Category category);
        void Remove(int id);
        Task SaveChanges();
        bool Exist(int id);
    }
}
