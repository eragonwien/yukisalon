﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using YukiSalonApi.Controllers;
using YukiSalonApi.Models;
using YukiSalonApi.Services;

namespace XUnitTestProject
{
    public class ContactControllerTest
    {
        private readonly Mock<IContactRepository> repoMock;
        private readonly Mock<ILogger<ContactController>> logger;
        private readonly ContactController controller;

        public ContactControllerTest()
        {
            repoMock = new Mock<IContactRepository>();
            logger = new Mock<ILogger<ContactController>>();
            controller = new ContactController(repoMock.Object, logger.Object);
        }

        [Fact]
        public Task Get_ReturnsOk_WhenExist()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public Task Get_Returns204_WhenNotExist()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public Task Add_ReturnsOk_WhenSuccessfullyAdded()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public Task Add_Returns400_ModelStateInvalid()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public Task Update_ReturnsOk_WhenUpdateSuccessfully()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public Task Update_Returns404_WhenIdNotFound()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public Task Update_Returns400_WhenIdNotMatchBody()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public Task Remove_ReturnsOk()
        {
            throw new NotImplementedException();
        }
    }
}
