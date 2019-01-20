using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yukisalon.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public int SalonId { get; set; }

        public string Email { get; set; }
        
        public string Name { get; set; }
        
        public string Password { get; set; }
        public string Description { get; set; }
        public string ExtraInfo { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDisplayed { get; set; }

        public int RoleId { get; set; }

        public Role Role { get; set; }
        public Salon Salon { get; set; }
    }
}
