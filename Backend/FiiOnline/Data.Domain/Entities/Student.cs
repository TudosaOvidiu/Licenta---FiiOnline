using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Domain.Entities
{
    public class Student: User
    {
        private Student() { }

        public int Year { get; private set; }
        public int Semester { get; private set; }

        public static Student Create(string firstName, string lastName, string username, string email, string role, int year, int semester)
        {
            var instance = new Student()
            {
                Id = Guid.NewGuid().ToString(),
            };
            instance.Update(firstName, lastName, username, email, role);
            instance.Update(year, semester);
            return instance;
        }

        public void Update(int year, int semester)
        {
            this.Year = year;
            this.Semester = semester;
        }
    }
}
