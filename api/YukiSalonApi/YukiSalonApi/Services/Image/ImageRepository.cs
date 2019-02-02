using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public class ImageRepository : IImageRepository
    {
        private readonly YUKISALONDEVContext context;
        private readonly SalonService salonService;

        public ImageRepository(YUKISALONDEVContext context, SalonService salonService)
        {
            this.context = context;
            this.salonService = salonService;
        }

        public void Add(Image image)
        {
            image.MimeType = salonService.GetMimeType(image.Name);
            context.Image.Add(image);
        }

        public bool Exist(int id)
        {
            return context.Image.Any(i => i.Id == id && i.IsActive == true);
        }

        public Task<List<Image>> GetAll()
        {
            return context.Image.Where(i => i.IsActive == true).ToListAsync();
        }

        public Task<Image> GetOne(int id)
        {
            return context.Image.Where(i => i.Id == id && i.IsActive == true).SingleAsync();
        }

        public string GetImagePath(Image image)
        {
            string fileName = salonService.GetFileName(image);
            string path = Path.Combine(salonService.GetImagesDirectory(), fileName);
            return path;
        }

        public void Remove(int id)
        {
            Image removeImage = context.Image.SingleOrDefault(i => i.Id == id);
            if (removeImage != null)
            {
                removeImage.IsActive = false;
                Update(removeImage);
            }
        }

        public Task SaveChanges()
        {
            return context.SaveChangesAsync();
        }

        public Task SaveImage(Image image)
        {
            if (image == null || string.IsNullOrEmpty(image.Data))
            {
                throw new Exception("Image is empty");
            }
            byte[] imageBytes = Convert.FromBase64String(image.Data);
            string imageName = salonService.GetFileName(image);

            string imagesDirectory = salonService.GetImagesDirectory();
            if (!Directory.Exists(imagesDirectory))
            {
                Directory.CreateDirectory(imagesDirectory);
            }

            string imagePath = Path.Combine(imagesDirectory, imageName);
            return File.WriteAllBytesAsync(imagePath, imageBytes);
        }

        public void Update(Image image)
        {
            context.Image.Update(image);
        }
    }
}
