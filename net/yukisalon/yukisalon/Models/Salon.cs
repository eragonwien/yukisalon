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
        public int ContactId { get; set; }
        public int OwnerId { get; set; }
        public string Description { get; set; }
        public string ExtraInfo { get; set; }

        public Contact Contact { get; set; }
        public Owner Owner { get; set; }
        public ICollection<Category> Category { get; set; }
    }
}
