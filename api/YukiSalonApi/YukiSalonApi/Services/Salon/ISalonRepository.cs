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
        Task Add(Salon salon);
        Task Update(Salon salon);
        Task Remove(int id);
        Task SaveChanges();
        bool Exist(int id);
    }
}
