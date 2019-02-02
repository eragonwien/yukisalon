using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public interface IImageRepository
    {
        Task<List<Image>> GetAll();
        Task<Image> GetOne(int id);
        void Add(Image image);
        void Update(Image image);
        void Remove(int id);
        Task SaveChanges();
        bool Exist(int id);
        Task SaveImage(Image image);
        string GetImagePath(Image image);
    }
}
