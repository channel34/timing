using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LetsGo.Models
{
    public class ScheduleCreate
    {
        [Required]
        public List<ScheduleRequest> Schedule { get; set; }
        [Required]
        public string EventName { get; set; }
        [Required]
        public string State { get; set; }
        public string ImageUrl { get; set; }

    }
}