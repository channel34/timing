using LetsGo.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace LetsGo.Controllers
{
    [RoutePrefix("api/todos")]
    public class LetsGoController : ApiController 
    {
        readonly ILetsGoService letsGoService;

        public LetsGoController(ILetsGoService letsGoService)
        {
            this.letsGoService = letsGoService;
        }
    }
}