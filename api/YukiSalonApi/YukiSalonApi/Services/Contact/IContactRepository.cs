using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public interface IContactRepository
    {
        Task<List<Contact>> GetAll();
        Task<Contact> GetOne(int id);
        void Add(Contact contact);
        void Update(Contact contact);
        string Remove(int id);
        Task SaveChanges();
        bool Exist(int id);
        bool Exist(Contact contact);
    }
}
