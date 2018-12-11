using LetsGo.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace LetsGo.Services
{
    public class LetsGoService : ILetsGoService
    {   
        public List<ScheduleRequest> GetAll()
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();

                cmd.CommandText = "LetsGo_GetAll";
                cmd.CommandType = CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    var schedules = new List<ScheduleRequest>();

                    while (reader.Read())
                    {
                        var schedule = new ScheduleRequest
                        {

                        }
                    }
                }
            }
        }

        public int Create(ScheduleCreate request)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "Schedule_Create";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@title", request.Title")
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