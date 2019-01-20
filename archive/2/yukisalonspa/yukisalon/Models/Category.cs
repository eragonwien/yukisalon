using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yukisalon.Models
{
    public partial class Category
    {
        public Category()
        {
            SubCategory = new HashSet<Category>();
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }

        public int? SalonId { get; set; }
        public int? ParentId { get; set; }

        public string Name { get; set; }
        public string Image { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsSubcategory { get; set; }

        public Category Parent { get; set; }
        public Salon Salon { get; set; }
        public ICollection<Category> SubCategory { get; set; }
        public ICollection<Product> Product { get; set; }
    }
}
