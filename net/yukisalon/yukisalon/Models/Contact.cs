using System;
using System.Collections.Generic;

namespace yukisalon.Models
{
    public partial class Contact
    {
        public Contact()
        {
            OpenHour = new HashSet<OpenHour>();
        }

        public int Id { get; set; }
        public int AddressId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Facebook { get; set; }
        public string Email { get; set; }

        public Address Address { get; set; }
        public ICollection<OpenHour> OpenHour { get; set; }
    }
}
