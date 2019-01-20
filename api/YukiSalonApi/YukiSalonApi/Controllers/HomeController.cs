using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace YukiSalonApi.Controllers
{
    public class HomeController : Controller
    {
        public string Index()
        {
            string status = "Status: Working";
            return status;
        }
    }
}