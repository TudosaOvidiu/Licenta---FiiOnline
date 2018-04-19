using System;
using System.Collections.Generic;

namespace DTOs
{
    public class CourseDTO
    {
        public Guid Id { get; set; }

        public String Name { get; set; }

        public String Description { get; set; }

        public string Year { get; set; }

        public int Semester { get; set; }

        public List<UserDTO> Professors { get; set; }


        public CourseDTO(Guid id, string name, string description, string year, int semester, List<UserDTO> professors)
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