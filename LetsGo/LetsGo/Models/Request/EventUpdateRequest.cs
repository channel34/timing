﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LetsGo.Models.Request
{
    public class EventUpdateRequest
    {
        public int id { get; set; }
        public string eventName { get; set; }
        public string state { get; set; }
        public string imageUrl { get; set; }
    }
}