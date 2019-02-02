using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly YUKISALONDEVContext context;

        public UserRepository(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        public void Add(User user)
        {
            if (!Exist(user))
            {
                throw new Exception("Email already exists");
            }

            if (user.RoleId < 0)
            {
                user.RoleId = context.Role.First().Id;
            }

            context.User.Add(user);
        }

        public bool Exist(int id)
        {
            return context.User.Any(u => u.Id == id);
        }

        public bool Exist(User user)
        {
            return context.User.Any(u => u.Email.Equals(user.Email));
        }

        public Task<List<User>> GetAll()
        {
            return context.User.ToListAsync();
        }

        public Task<User> GetOne(int id)
        {
            return context.User.Where(u => u.Id == id).SingleAsync();
        }

        public string Remove(int id, string login)
        {
            User removeUser = context.User.SingleOrDefault(u => u.Id == id);

            if (removeUser == null)
            {
                return string.Empty;
            }

            if (removeUser.Email.Equals(login))
            {
                return "cannot remove self";
            }

            if (context.User.Count(u => u.SalonId == removeUser.SalonId) == 1)
            {
                return "cannot remove last User of Salon " + removeUser.Salon.Name;
            }

            return string.Empty;
        }

        public Task SaveChanges()
        {
            return context.SaveChangesAsync();
        }

        public void Update(User user)
        {
            context.Update(user);
        }
    }
}
