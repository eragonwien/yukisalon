﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yukisalon.Models
{
    public partial class Product
    {
        public int Id { get; set; }

        public int CategoryId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public decimal Price { get; set; }
        public bool? IsFixPrice { get; set; }

        public string Currency { get; set; }
        public string Image { get; set; }
        public bool? IsFeatured { get; set; }
        public bool? IsActive { get; set; }

        public Category Category { get; set; }
    }
}
