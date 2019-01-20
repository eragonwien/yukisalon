using System;
using System.Collections.Generic;

namespace yukisalon.Models
{
    public partial class OpenHour
    {
        public int Id { get; set; }
        public int ContactId { get; set; }
        public string Day { get; set; }
        public bool IsOpen { get; set; }
        public string Open { get; set; }
        public string Close { get; set; }

        public Contact Contact { get; set; }
    }
}
