using System;
using System.Collections.Generic;

namespace yukisalon.Models
{
    public partial class Category
    {
        public Category()
        {
            InverseSubcategory = new HashSet<Category>();
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public int? SalonId { get; set; }
        public int? SubcategoryId { get; set; }
        public string Image { get; set; }

        public Salon Salon { get; set; }
        public Category Subcategory { get; set; }
        public ICollection<Category> InverseSubcategory { get; set; }
        public ICollection<Product> Product { get; set; }
    }
}
