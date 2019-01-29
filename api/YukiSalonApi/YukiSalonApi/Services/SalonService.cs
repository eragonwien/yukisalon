using System;
using System.Security.Cryptography;

namespace YukiSalonApi.Services
{
    public class SalonService : ISalonService
    {
        private const int iterlation = 10000;
        private const int saltBytesLength = 17;
        private const int passwordBytesLength = 25;

        public string GetEncodedPassword(string password)
        {
            // Creates new salt
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[saltBytesLength]);

            // Creates the Rfc2898DeriveBytes and get the hash value fron password
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterlation);
            byte[] hash = pbkdf2.GetBytes(passwordBytesLength);

            // Combines salt and password
            byte[] hashBytes = new byte[saltBytesLength + passwordBytesLength];
            Array.Copy(salt, 0, hashBytes, 0, saltBytesLength);
            Array.Copy(hash, 0, hashBytes, saltBytesLength, passwordBytesLength);

            string hashedPassword = Convert.ToBase64String(hashBytes);
            return hashedPassword;
        }

        public bool IsPasswordValid(string password, string storedHash)
        {
            // Extracts stored Hash
            byte[] storedHashBytes = Convert.FromBase64String(storedHash);
            // Gets salt from hash
            byte[] salt = new byte[saltBytesLength];
            Array.Copy(storedHashBytes, 0, salt, 0, saltBytesLength);

            // Extracts password
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterlation);
            byte[] inputHashBytes = pbkdf2.GetBytes(passwordBytesLength);

            // Compares result
            for (int i = 0; i < passwordBytesLength; i++)
            {
                if (storedHashBytes[i+saltBytesLength] != inputHashBytes[i])
                {
                    return false;
                }
            }

            return true;
        }
    }
}
