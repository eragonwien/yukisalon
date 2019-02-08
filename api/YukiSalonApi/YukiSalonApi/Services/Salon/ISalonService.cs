using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public interface ISalonService
    {
        string GetEncodedPassword(string password);
        bool IsPasswordValid(string password, string storedHash);
        string GetFileName(Image image);
        string GetImagesDirectory();
        string GetArchiveDirectory(string childDirectory);
        string GetMimeType(string filename);
    }
}
