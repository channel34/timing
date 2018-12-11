using System.Collections.Generic;
using LetsGo.Models;

namespace LetsGo.Services
{
    public interface ILetsGoService
    {
        int Create(ScheduleCreate request);
        List<ScheduleRequest> GetAll();
    }
}