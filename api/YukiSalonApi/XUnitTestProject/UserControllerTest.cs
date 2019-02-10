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
    public class UserControllerTest
    {
        private readonly Mock<IUserRepository> repoMock;
        private readonly Mock<ILogger<UserController>> logger;
        private readonly UserController controller;

        public UserControllerTest()
        {
            repoMock = new Mock<IUserRepository>();
            logger = new Mock<ILogger<UserController>>();
            controller = new UserController(repoMock.Object, logger.Object);
        }

        [Fact]
        public async Task GetOne_ReturnsOk_WhenFound()
        {
            // Arrange
            User user = new User() { Id = 1 };
            repoMock.Setup(r => r.GetOne(user.Id)).Returns(Task.FromResult(user));

            // Act
            var result = await controller.GetOne(user.Id);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            User model = Assert.IsAssignableFrom<User>(actionResult.Value);
            Assert.Equal(user, model);
        }

        [Fact]
        public async Task GetOne_Returns204_WhenUserNotFound()
        {
            // Arrange
            User user = new User() { Id = 1 };
            repoMock.Setup(r => r.GetOne(user.Id)).Returns(Task.FromResult<User>(null));

            // Act
            var result = await controller.GetOne(user.Id);

            // Assert
            var actionResult = Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Add_ReturnsOk_WhenSuccessfullyAdded()
        {
            // Arrange
            User user = new User { Id = 1 };
            repoMock.Setup(r => r.SaveChanges()).Returns(Task.CompletedTask);

            // Act
            var result = await controller.Create(user);

            // Assert
            repoMock.Verify(r => r.Add(user));
            var actionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(user, actionResult.Value);
        }

        [Fact]
        public Task Add_Returns400_WhenEmailAlreadyTaken()
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

        [Fact]
        public Task Remove_Returns400_WhenRemoveLastUser()
        {
            throw new NotImplementedException();
        }
    }
}
