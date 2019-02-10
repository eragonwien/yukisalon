using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public class CategoryRepository : ICategoryRepository
    {
        public void Add(Category catgory)
        {
            throw new NotImplementedException();
        }

        public bool Exist(int id)
        {
            throw new NotImplementedException();
        }

        public bool Exist(string name)
        {
            throw new NotImplementedException();
        }

        public Task<List<Category>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Category> GetOne(int id)
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }

        public Task SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void Update(Category category)
        {
            throw new NotImplementedException();
        }
    }
}
