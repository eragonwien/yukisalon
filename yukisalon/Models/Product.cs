using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yukisalon.Models
{
    public partial class Product
    {
        public int Id { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }
        public bool? IsFixPrice { get; set; }

        [Required]
        public string Currency { get; set; }
        public string Image { get; set; }
        public bool? IsFeatured { get; set; }

        public Category Category { get; set; }
    }
}
