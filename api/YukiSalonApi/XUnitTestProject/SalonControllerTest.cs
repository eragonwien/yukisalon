using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using YukiSalonApi.Controllers;
using YukiSalonApi.Models;
using YukiSalonApi.Services;

namespace XUnitTestProject
{
    public class SalonControllerTest
    {
        private readonly Mock<ISalonRepository> salonRepoMock;
        private readonly SalonController controller;

        public SalonControllerTest()
        {
            salonRepoMock = new Mock<ISalonRepository>();
            controller = new SalonController(salonRepoMock.Object);
        }

        [Fact]
        public async Task Get_ReturnsListOfSalons()
        {
            // Arrange
            var mockSalonList = new List<Salon>
            {
                new Salon { Id = 1 },
                new Salon { Id = 2 }
            };

            salonRepoMock
                .Setup(r => r.GetAll())
                .Returns(Task.FromResult(mockSalonList));

            // Act
            var result = await controller.Get();

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<Salon>>(actionResult.Value);
            Assert.Equal(2, model.Count);
            Assert.Equal(mockSalonList, model);
        }

        [Fact]
        public void GetOne_ReturnsOneSalon()
        {
            // Arrange
            Salon salon = new Salon() { Id = 1 };
            salonRepoMock.Setup(r => r.GetOne(salon.Id)).Returns(salon);

            // Act
            var result = controller.GetOne(salon.Id);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Salon model = Assert.IsAssignableFrom<Salon>(actionResult.Value);
            Assert.Equal(salon, model);

            if (model.User.Count > 0)
            {
                foreach (User user in model.User)
                {
                    Assert.Null(user.Password);
                }
            }
        }

        [Fact]
        public async Task Add_ReturnsOk_WhenSuccessfullyAdded()
        {
            // Arrange
            var mockSalon = new Salon() { Id = 1 };
            salonRepoMock.Setup(r => r.SaveChanges()).Returns(Task.CompletedTask);

            // Act
            var result = await controller.Add(mockSalon);

            // Assert
            salonRepoMock.Verify(r => r.Add(mockSalon));
            var actionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(mockSalon, actionResult.Value);

        }

        [Fact]
        public async Task Add_ReturnsBadRequest_WhenModelError()
        {
            // Arrange
            var mockSalon = new Salon() { Id = 1 };
            controller.ModelState.AddModelError("Name", "Name is required");

            // Act
            var result = await controller.Add(mockSalon);

            // Assert
            var actionResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(new SerializableError(controller.ModelState), actionResult.Value);

        }

        [Fact]
        public async Task Update_Returns204_WhenSuccessfullyUpdated()
        {
            // Arrange
            var mockSalon = new Salon() { Id = 1 };
            salonRepoMock.Setup(r => r.SaveChanges()).Returns(Task.CompletedTask);

            // Act
            var result = await controller.Update(mockSalon.Id, mockSalon);

            // Assert
            salonRepoMock.Verify(r => r.Update(mockSalon));
            var actionResult = Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsBadRequest_WhenModelError()
        {
            // Arrange
            var mockSalon = new Salon() { Id = 1 };
            controller.ModelState.AddModelError("Name", "Name is required");

            // Act
            var result = await controller.Update(mockSalon.Id, mockSalon);

            // Assert
            var actionResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(new SerializableError(controller.ModelState), actionResult.Value);
        }

        [Fact]
        public async Task Update_ReturnsBadRequest_WhenIdNotMatch()
        {
            // Arrange
            var mockSalon = new Salon() { Id = 1 };
            int fakeId = 2;
            salonRepoMock.Setup(r => r.SaveChanges()).Returns(Task.CompletedTask);

            // Act
            var result = await controller.Update(fakeId, mockSalon);

            // Assert
            var actionResult = Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task Remove_ReturnsOkWithId_WhenSuccessfullyRemoved()
        {
            // Arrange
            var mockSalon = new Salon() { Id = 1 };
            salonRepoMock.Setup(r => r.SaveChanges()).Returns(Task.CompletedTask);

            // Act
            var result = await controller.Remove(mockSalon.Id);

            // Assert
            salonRepoMock.Verify(r => r.Remove(mockSalon.Id));
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(mockSalon.Id, actionResult.Value);
        }

        [Fact]
        public async Task Remove_ReturnsBadRequest_WhenModelError()
        {
            // Arrange
            var mockSalon = new Salon() { Id = 1 };
            controller.ModelState.AddModelError("", "Id not valid");

            // Act
            var result = await controller.Remove(mockSalon.Id);

            // Assert
            var actionResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(new SerializableError(controller.ModelState), actionResult.Value);
        }
    }
}
