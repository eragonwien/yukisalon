using System;
using System.Collections.Generic;

namespace YukiSalonApi.Models
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
        public string WelcomeTitle { get; set; }
        public string WelcomeText { get; set; }

        public virtual ICollection<Category> Category { get; set; }
        public virtual ICollection<Contact> Contact { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
