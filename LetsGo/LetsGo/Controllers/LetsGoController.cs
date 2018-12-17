using LetsGo.Models;
using LetsGo.Models.Request;
using LetsGo.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace LetsGo.Controllers
{
    [RoutePrefix("api/letsgo")]
    public class LetsGoController : ApiController
    {
        readonly LetsGoService letsGoService;

        public LetsGoController(LetsGoService letsGoService)
        {
            this.letsGoService = letsGoService;
        }

        [Route("uploadSchedule"), HttpPost]
        public HttpResponseMessage Create(ScheduleCreate schedule)
        {
            if (schedule == null)
            {
                ModelState.AddModelError("", "no data");
            }

            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            letsGoService.Create(schedule);
            return Request.CreateResponse(HttpStatusCode.OK);

        }

        [Route("search/{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage Search(int pageIndex, int pageSize, string q)
        {
            List<Event> listOfEvents = letsGoService.Search(pageIndex, pageSize, q);

            return Request.CreateResponse(HttpStatusCode.OK, listOfEvents);
        }

        [Route("event/{Id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            Event evt = letsGoService.GetById(id);

            return Request.CreateResponse(HttpStatusCode.OK, evt);
        }

        [Route("update/{Id:int}"), HttpPut]
        public HttpResponseMessage Update(EventUpdateRequest req)
        {
            if (req == null)
            {
                ModelState.AddModelError("", "no data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            letsGoService.Update(req);
            return Request.CreateResponse(HttpStatusCode.OK);


        }
        [Route("delete/{Id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            letsGoService.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}