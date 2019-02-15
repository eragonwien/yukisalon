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
    public class CategoryControllerTest
    {
        private readonly Mock<ICategoryRepository> repoMock;
        private readonly Mock<ILogger<CategoryController>> logger;
        private readonly CategoryController controller;

        public CategoryControllerTest()
        {
            repoMock = new Mock<ICategoryRepository>();
            logger = new Mock<ILogger<CategoryController>>();
            controller = new CategoryController(repoMock.Object, logger.Object);
        }

        [Fact]
        public void Get_ReturnsOk_WhenExist()
        {
            Category category = new Category { Id = 1 };
            repoMock.Setup(r => r.GetOne(category.Id)).Returns(Task.FromResult(category));

            var result = controller.GetOne(category.Id);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            Category model = Assert.IsAssignableFrom<Category>(actionResult.Value);
            Assert.Equal(category, model);
        }

        [Fact]
        public void Get_Returns204_WhenNotExist()
        {
            Category category = new Category { Id = 1 };
            repoMock.Setup(r => r.GetOne(category.Id)).Returns(Task.FromResult<Category>(null));

            var result = controller.GetOne(category.Id);

            var actionResult = Assert.IsType<NoContentResult>(result);
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
