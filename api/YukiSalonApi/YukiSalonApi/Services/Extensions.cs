using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YukiSalonApi.Services
{
    public static class Extensions
    {
        public static string GetFileExtension(this string filename)
        {
            if (string.IsNullOrEmpty(filename) || !filename.Contains('.'))
            {
                return string.Empty;
            }

            return filename.Substring(filename.LastIndexOf('.') + 1);
        }
    }
}
