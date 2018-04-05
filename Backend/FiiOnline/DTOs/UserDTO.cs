using System;
using Data.Domain.Entities;

namespace DTOs
{
    public class UserDTO
    {
        public String Id { get; set; }

        public String Username { get; set; }

        public String FirstName { get; set; }

        public String LastName { get; set; }

        public String Email { get; set; }

        public String Role { get; set; }

        public UserDTO(String id, String username, String firstName, String lastName, String email, String role)
        {
            Id = id;
            Username = username;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Role = role;
        }

    }
}