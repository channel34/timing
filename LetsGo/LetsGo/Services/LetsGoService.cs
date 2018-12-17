using LetsGo.Models;
using LetsGo.Models.Request;
using LetsGo.Models.Responses;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace LetsGo.Services
{
    public class LetsGoService 
    {

        public int Create(ScheduleCreate data)
        {
            
            string jsonSchedule = JsonConvert.SerializeObject(data.Schedule);
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "Event_Insert";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@json", jsonSchedule);
                cmd.Parameters.AddWithValue("@EventName", data.EventName);
                cmd.Parameters.AddWithValue("@State", data.State);
                cmd.Parameters.AddWithValue("@ImageUrl", data.ImageUrl);
                cmd.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();

                return (int)cmd.Parameters["@Id"].Value;
            }
        }

        public void Update(EventUpdateRequest req)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "Events_Update";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("Id", req.id);
                cmd.Parameters.AddWithValue("EventName", req.eventName);
                cmd.Parameters.AddWithValue("State", req.state);
                cmd.Parameters.AddWithValue("ImageUrl", req.imageUrl);
                cmd.ExecuteNonQuery();
            }
        }

        public List<Event> Search(int pageIndex, int pageSize, string q)
        {
            using (var con = GetConnection())
               
            {
    
                List<Event> listOfEvents = new List<Event>();
                var cmd = con.CreateCommand();

                cmd.CommandText = "Events_Search";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@search", q);
                cmd.Parameters.AddWithValue("@PageIndex", pageIndex);
                cmd.Parameters.AddWithValue("@PageSize", pageSize);

                var events = new List<Event>();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {

                  
                    var evt = new Event
                    {
                        id = (int)reader["Id"],
                        eventName = (string)reader["EventName"],
                        state = (string)reader["State"],
                        imageUrl = (string)reader["imageUrl"]

                    };

                    events.Add(evt);
                                         
                      }
                }
                return events;
               
            }

        }

        public Event GetById(int id)
        {
            using (var con = GetConnection())

            {       
                var cmd = con.CreateCommand();

                cmd.CommandText = "Events_GetById";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);
                             
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                        
                        var evt = new Event
                        {
                            id = (int)reader["Id"],
                            eventName = (string)reader["EventName"],
                            state = (string)reader["State"],
                            imageUrl = (string)reader["imageUrl"]
                        };
                        return evt;                  
                }            
            }
            

        }

        public void Delete(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "Events_Delete";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
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