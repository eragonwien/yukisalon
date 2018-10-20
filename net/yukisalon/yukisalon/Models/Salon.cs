using System;
using System.Collections.Generic;

namespace yukisalon.Models
{
    public partial class Salon
    {
        public Salon()
        {
            Category = new HashSet<Category>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ExtraInfo { get; set; }

        public ICollection<Category> Category { get; set; }
        public Contact Contact { get; set; }
        public User User { get; set; }
        public Welcome Welcome { get; set; }
    }
}
