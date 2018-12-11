using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LetsGo.Models
{
    public class ScheduleRequest
    {
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }

    }
}