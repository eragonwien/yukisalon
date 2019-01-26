using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Xunit;
using YukiSalonApi.Controllers;
using YukiSalonApi.Models;

namespace XUnitTestApi
{
    public class SalonControllerTest
    {
        private readonly SalonController controller;
        private readonly YUKISALONDEVContext context;

        public SalonControllerTest()
        {
        }

        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {

        }
    }
}
