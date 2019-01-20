using System;
using System.Collections.Generic;

namespace yukisalon.Models
{
    public partial class Role
    {
        public Role()
        {
            User = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool? IsActive { get; set; }

        public ICollection<User> User { get; set; }
    }
}
