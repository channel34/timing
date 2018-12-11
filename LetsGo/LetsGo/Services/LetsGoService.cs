using LetsGo.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace LetsGo.Services
{
    public class LetsGoService
    {   
        public List<ScheduleRequest> GetAll()
        {
            using (var con = GetConnection())
            {

            }
        }

        // helper method to create and open a database connection
        SqlConnection GetConnection()
        {
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Default"].ConnectionString);
            con.Open();
            return con;
        }
    }
}