using System;
using System.Collections.Generic;

namespace yukisalon.Models
{
    public partial class Address
    {
        public Address()
        {
            Contact = new HashSet<Contact>();
        }

        public int Id { get; set; }
        public string Street { get; set; }
        public string Plz { get; set; }
        public string City { get; set; }

        public ICollection<Contact> Contact { get; set; }
    }
}
