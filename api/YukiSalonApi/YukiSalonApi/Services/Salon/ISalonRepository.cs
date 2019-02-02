using System.Collections.Generic;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public interface ISalonRepository
    {
        Task<List<Salon>> GetAll();
        Salon GetOne(int id);
        int GetFirstId();
        void Add(Salon salon);
        void Update(Salon salon);
        void Remove(int id);
        Task SaveChanges();
        bool Exist(int id);
        Task<List<Category>> GetSubcategories(int id);
    }
}
