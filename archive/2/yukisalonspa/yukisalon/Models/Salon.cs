﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yukisalon.Models
{
    public partial class Salon
    {
        public Salon()
        {
            Category = new HashSet<Category>();
            Contact = new HashSet<Contact>();
            User = new HashSet<User>();
        }

        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string ExtraInfo { get; set; }
        public bool? IsActive { get; set; }

        public ICollection<Category> Category { get; set; }
        public ICollection<Contact> Contact { get; set; }
        public ICollection<User> User { get; set; }
        public Welcome Welcome { get; set; }
    }
}
