using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using YukiSalonApi.Controllers;
using YukiSalonApi.Models;
using YukiSalonApi.Services;

namespace XUnitTestProject
{
    public class AccountControllerTest
    {
        private readonly Mock<IUserRepository> userRepoMock;
        private readonly Mock<ILogger<AccountController>> logger;
        private readonly AccountController controller;

        public AccountControllerTest()
        {
            userRepoMock = new Mock<IUserRepository>();
            logger = new Mock<ILogger<AccountController>>();
            controller = new AccountController(userRepoMock.Object, logger.Object);
        }

        [Fact]
        public async Task Login_Returns403_WhenAuthenticationFail()
        {
            // Arrange
            var user = new User() { Id = 1, Email = "email", Password = "password" };
            userRepoMock
                .Setup(r => r.Authenticate(user.Email, user.Password))
                .Throws(new Exception());

            // Act
            var result = await controller.Login(user.Email, user.Password);

            // Assert
            Assert.IsType<UnauthorizedResult>(result);
        }
    }
}
