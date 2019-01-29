using Xunit;
using YukiSalonApi.Services;

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
    }
}
