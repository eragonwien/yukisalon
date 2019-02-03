using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using YukiSalonApi.Services;

namespace XUnitTestProject
{
    public class ExtensionTest
    {
        [Fact]
        public void ReturnExtension_GivenValidRegularFileName()
        {
            // Arrange
            string filename = "test.pdf";
            string expected = "pdf";

            // Act 
            string result = filename.GetFileExtension();

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void ReturnExtension_GivenValidMultiPointFileName()
        {
            // Arrange
            string filename = "test.test.pdf";
            string expected = "pdf";

            // Act 
            string result = filename.GetFileExtension();

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void ReturnEmpty_GivenEmptyFileName()
        {
            // Arrange
            string filename = string.Empty;
            string expected = string.Empty;

            // Act 
            string result = filename.GetFileExtension();

            // Assert
            Assert.Equal(expected, result);
        }

        [Fact]
        public void ReturnEmpty_GivenFileNameWithoutDot()
        {
            // Arrange
            string filename = "test";
            string expected = string.Empty;

            // Act 
            string result = filename.GetFileExtension();

            // Assert
            Assert.Equal(expected, result);
        }
    }
}
