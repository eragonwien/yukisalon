using System;
using System.Collections.Generic;

namespace YukiSalonApi.Models
{
    public partial class Image
    {
        public Image()
        {
            Category = new HashSet<Category>();
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Data { get; set; }
        public string Name { get; set; }
        public string MimeType { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<Category> Category { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}
