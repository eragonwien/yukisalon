using System.Collections.Generic;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public interface ISalonRepository<T>
    {
        Task<List<T>> GetAll();
        T GetOne(int id);
        int GetFirstId();
        void Add(T obj);
        void Update(T obj);
        void Remove(int id);
        Task SaveChanges();
        bool Exist(int id);
        Task<List<Category>> GetSubcategories(int id);
    }
}
