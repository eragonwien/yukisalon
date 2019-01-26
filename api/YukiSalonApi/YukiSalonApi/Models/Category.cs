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
        public int? ImageId { get; set; }
        public string Name { get; set; }
        public bool? IsSubcategory { get; set; }
        public bool? IsActive { get; set; }

        public virtual Image Image { get; set; }
        public virtual Category Parent { get; set; }
        public virtual Salon Salon { get; set; }
        public virtual ICollection<Category> Subcategory { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}
