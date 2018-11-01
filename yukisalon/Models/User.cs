using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yukisalon.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public int SalonId { get; set; }

        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Password { get; set; }
        public string Description { get; set; }
        public string ExtraInfo { get; set; }
        public bool? IsActive { get; set; }
        
        [Required]
        public int RoleId { get; set; }

        public Role Role { get; set; }
        public Salon Salon { get; set; }
    }
}
