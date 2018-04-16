using System;
using System.Collections.Generic;

namespace DTOs
{
    public class CourseDTO
    {
        public Guid Id { get; set; }

        public String Name { get; set; }

        public String Description { get; set; }

        public int Year { get; set; }

        public int Semester { get; set; }

        public List<UserDTO> Professors { get; set; }


        public CourseDTO(Guid id, String name, String description, int year, int semester, List<UserDTO> professors)
        {
            Id = id;
            Name = name;
            Description = description;
            Year = year;
            Semester = semester;
            Professors = professors;
        }
    }
}