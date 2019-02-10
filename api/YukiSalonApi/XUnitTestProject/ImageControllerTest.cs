using System;
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
    public class ImageControllerTest
    {
        private readonly Mock<IImageRepository> repoMock;
        private readonly Mock<ILogger<ImageController>> logger;
        private readonly ImageController controller;

        public ImageControllerTest()
        {
            repoMock = new Mock<IImageRepository>();
            logger = new Mock<ILogger<ImageController>>();
            controller = new ImageController(repoMock.Object, logger.Object);
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
