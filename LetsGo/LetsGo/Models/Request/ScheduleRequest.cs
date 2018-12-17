using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LetsGo.Models
{
    public class ScheduleRequest
    {
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public string Title { get; set; }
        public int Day { get; set; }
        public string Location { get; set; }
        public string ImageUrl { get; set; }

    }
}