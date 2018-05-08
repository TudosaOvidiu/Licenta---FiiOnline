using System;
using Microsoft.Data.OData;

namespace Data.Domain.Entities
{
    public class StudentCourse
    {
        public string StudentId { get; private set; }
        public Student Student { get; private set; }

        public Guid CourseId { get; private set; }
        public Course Course { get; private set; }

        public static StudentCourse CreateStudentCourse(Student student)
        {
            var instance = new StudentCourse
            {
                Student = student
            };

            return instance;
        }
    }
}