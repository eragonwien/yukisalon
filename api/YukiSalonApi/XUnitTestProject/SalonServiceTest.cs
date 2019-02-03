using System;
using Xunit;
using YukiSalonApi.Models;
using YukiSalonApi.Services;
using HeyRed.Mime;

namespace XUnitTestProject
{
    public class SalonServiceTest
    {
        private readonly SalonService service;

        public SalonServiceTest()
        {
            service = new SalonService();
        }

        [Fact]
        public void ReturnTrue_GivenCorrectPassword()
        {
            // Arrange
            const string password = "passowrd";
            string hashedPassword = service.GetEncodedPassword(password);

            // Act
            bool result = service.IsPasswordValid(password, hashedPassword);

            // Assert
            Assert.True(result, "Password should be valid");
        }

        [Fact]
        public void ReturnFalse_GivenWrongPassword()
        {
            // Arrange
            const string correctPassword = "passowrd";
            const string wrongPassword = "Password";
            string hashedCorrectPassword = service.GetEncodedPassword(correctPassword);

            // Act
            bool result = service.IsPasswordValid(wrongPassword, hashedCorrectPassword);

            // Assert
            Assert.False(result, "Password should not be valid");
        }

        [Fact]
        public void ReturnFileName_GivenValidImage()
        {
            // Arrange
            string JPEG = "jpeg";
            Image image = new Image()
            {
                Id = 1,
                MimeType = MimeTypesMap.GetMimeType(JPEG)
            };
            string expected = image.Id + "." + JPEG;

            // Act 
            string result = service.GetFileName(image);

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void ThrowException_GivenEmptyImageId()
        {
            // Arrange
            Image image = new Image();

            // Act & Assert
            Assert.Throws<Exception>(() => service.GetFileName(image));
        }

        [Fact]
        public void ThrowException_GivenEmptyMimeType()
        {
            // Arrange
            Image image = new Image() { Id = 1 };

            // Act & Assert
            Assert.Throws<Exception>(() => service.GetFileName(image));
        }

        [Fact]
        public void ReturnMimeType_GivenValidFilename()
        {
            // Arrange
            string filename = "test.pdf";
            string expected = MimeTypesMap.GetMimeType("pdf");

            // Act
            string result = service.GetMimeType(filename);

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void ReturnDefaultMimeType_GivenInvalidFilename()
        {
            // Arrange
            string filename = "test.test.test";

            // Act
            string result = service.GetMimeType(filename);

            // Assert
            Assert.NotNull(result);
            Assert.NotNull(MimeTypesMap.GetExtension(result));
        }
    }
}
