using System;

namespace DTOs
{
    public class StudentDTO
    {
        public String Id { get; set; }

        public String Username { get; set; }

        public String FirstName { get; set; }

        public String LastName { get; set; }

        public String Email { get; set; }

        public String Role { get; set; }

        public String ImageURL { get; set; }

        public String Year { get; set; }

        public int Semester { get; set; }

        public StudentDTO(String id, String username, String firstName, String lastName, String email, String role, String imageUrl, String year, int semester)
        {
            Id = id;
            Username = username;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Role = role;
            ImageURL = imageUrl;
            Year = year;
            Semester = semester;
        }

    }
}
