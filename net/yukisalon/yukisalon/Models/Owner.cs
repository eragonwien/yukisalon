using System;
using System.Collections.Generic;

namespace yukisalon.Models
{
    public partial class Owner
    {
        public Owner()
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ExtraInfo { get; set; }
    }
}
