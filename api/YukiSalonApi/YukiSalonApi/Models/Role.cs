using System;
using System.Collections.Generic;

namespace YukiSalonApi.Models
{
    public partial class Role
    {
        public Role()
        {
            User = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public bool? IsActive { get; set; }
        public string Description { get; set; }

        public ICollection<User> User { get; set; }
    }
}
