using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace yukisalon.Models
{
    public partial class Welcome
    {
        public int Id { get; set; }

        public int SalonId { get; set; }

        public string Title { get; set; }
        public string Text1 { get; set; }
        public string Text2 { get; set; }
        public bool? IsActive { get; set; }

        public Salon Salon { get; set; }
    }
}
