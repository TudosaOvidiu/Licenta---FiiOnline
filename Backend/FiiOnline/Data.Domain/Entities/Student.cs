using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Domain.Entities
{
    public class Student: User
    {
        private Student() { }

        public string Year { get; private set; }
        public int Semester { get; private set; }
        public ICollection<StudentCourse> FollowingCourses { get; private set; }

        public static Student Create(string firstName, string lastName, string username, string email, string role, string year, int semester, string imageURL)
        {
            var instance = new Student()
            {
                Id = Guid.NewGuid().ToString(),
            };
            instance.Update(firstName, lastName, username, email, role, imageURL);
            instance.Update(year, semester);
            return instance;
        }

        public void Update(string year, int semester)
        {
            this.Year = year;
            this.Semester = semester;
        }

    }
}
