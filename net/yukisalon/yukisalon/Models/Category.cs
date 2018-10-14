using System;
using System.Collections.Generic;

namespace yukisalon.Models
{
    public partial class Category
    {
        public Category()
        {
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public int? SalonId { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }

        public ICollection<Product> Product { get; set; }
    }
}
