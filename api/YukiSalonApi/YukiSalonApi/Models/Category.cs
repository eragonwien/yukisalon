using System;
using System.Collections.Generic;

namespace YukiSalonApi.Models
{
    public partial class Category
    {
        public Category()
        {
            Subcategory = new HashSet<Category>();
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public int? SalonId { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public bool? IsSubcategory { get; set; }
        public bool? IsActive { get; set; }

        public Category Parent { get; set; }
        public Salon Salon { get; set; }
        public ICollection<Category> Subcategory { get; set; }
        public ICollection<Product> Product { get; set; }
    }
}
