using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;
using YukiSalonApi.Resources;

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

        public async Task<User> Authenticate(string email, string password)
        {
            User user = await GetOne(email);

            if (user == null)
            {
                throw new Exception(Translation.UserNotFound);
            }

            if (!Common.IsPasswordValid(password, user.Password))
            {
                throw new Exception(Translation.WrongPassword);
            }

            return user;
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

        public Task<User> GetOne(string email)
        {
            return context.User.SingleOrDefaultAsync(u => u.Email.Equals(email));
        }

        public Task<User> GetOne(int id)
        {
            return context.User.Where(u => u.Id == id).SingleAsync();
        }

        public Task<Role> GetRole(User user)
        {
            return context.Role.SingleAsync(r => r.IsActive && r.Id == user.RoleId);
        }

        public string Remove(int id)
        {
            User removeUser = context.User.SingleOrDefault(u => u.Id == id);

            if (removeUser == null)
            {
                return string.Empty;
            }

            if (context.User.Count(u => u.SalonId == removeUser.SalonId) == 1)
            {
                return Translation.RemoveNotAllowedLastSalon;
            }

            removeUser.IsActive = false;
            Update(removeUser);

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
