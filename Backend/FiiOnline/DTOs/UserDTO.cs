using System;
using Data.Domain.Entities;

namespace DTOs
{
    public class UserDTO
    {
        public String Username { get; set; }

        public String Password { get; set; }

        public String ConfirmPassword { get; set; }

        public String Name { get; set; }

        public String Email { get; set; }

        public String Role { get; set; }

        public UserDTO()
        {
        }

    }
}