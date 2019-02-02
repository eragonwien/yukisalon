using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public interface IUserRepository
    {
        Task<List<User>> GetAll();
        Task<User> GetOne(int id);
        void Add(User user);
        void Update(User user);
        string Remove(int id, string login);
        Task SaveChanges();
        bool Exist(int id);
        bool Exist(User user);
    }
}
