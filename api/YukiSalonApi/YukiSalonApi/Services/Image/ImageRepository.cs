﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;
using YukiSalonApi.Resources;
using YukiSalonApi.Services;

namespace YukiSalonApi.Services
{
    public class ImageRepository : IImageRepository
    {
        private readonly YUKISALONDEVContext context;

        public ImageRepository(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        public void Add(Image image)
        {
            image.MimeType = Common.GetMimeType(image.Name);
            context.Image.Add(image);
        }

        public bool Exist(int id)
        {
            return context.Image.Any(i => i.Id == id && i.IsActive);
        }

        public Task<List<Image>> GetAll()
        {
            return context.Image.Where(i => i.IsActive).ToListAsync();
        }

        public Task<Image> GetOne(int id)
        {
            return context.Image.Where(i => i.Id == id && i.IsActive).SingleAsync();
        }

        public string GetImagePath(Image image)
        {
            string filename = Common.GetFileName(image);
            string path = Path.Combine(Common.GetImagesDirectory(), filename);
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

        public Task SaveInDisk(Image image)
        {
            if (image == null || string.IsNullOrEmpty(image.Data))
            {
                throw new Exception(Translation.ImageEmpty);
            }
            byte[] imageBytes = Convert.FromBase64String(image.Data);
            string imageName = Common.GetFileName(image);

            string imagesDirectory = Common.GetImagesDirectory();
            if (!Directory.Exists(imagesDirectory))
            {
                Directory.CreateDirectory(imagesDirectory);
            }

            string imagePath = Path.Combine(imagesDirectory, imageName);
            if (File.Exists(imagePath))
            {
                File.Delete(imagePath);
            }
            return File.WriteAllBytesAsync(imagePath, imageBytes);
        }

        public Task RemoveFromDisk(int id, bool isArchived = true)
        {
            Image image = context.Image.SingleOrDefault(i => i.Id == id);
            if (image == null || string.IsNullOrEmpty(image.Data))
            {
                throw new Exception(Translation.ImageEmpty);
            }
            string imageName = Common.GetFileName(image);
            string imagesDirectory = Common.GetImagesDirectory();
            if (Directory.Exists(imagesDirectory))
            {
                string imagePath = Path.Combine(imagesDirectory, imageName);

                if (isArchived)
                {
                    string archivePath = Path.Combine(Common.GetArchiveDirectory(Constant.IMAGES_DIRECTORY), imageName);

                    if (File.Exists(archivePath))
                    {
                        File.Delete(archivePath);
                    }

                    File.Move(imagePath, archivePath);
                }
                else
                {
                    File.Delete(imagePath);
                }
                
            }
            return Task.CompletedTask;
        }

        public void Update(Image image)
        {
            context.Image.Update(image);
        }
    }
}
