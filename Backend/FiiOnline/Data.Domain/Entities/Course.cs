using System;
using System.Collections.Generic;
using CreatingModels;

namespace Data.Domain.Entities
{
    public class Course
    {
        private Course() { }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public int Year { get; private set; }
        public int Semester { get; private set; }
        public List<Lesson> Lessons { get; private set; }
        public ICollection<UserCourse> UserCourses { get; private set; }

        public static Course Create(string name, int year, int semester, List<Lesson> lessons, List<User> professors)
        {
            var instance = new Course { Id = Guid.NewGuid() };
            instance.Update(name, year, semester, lessons);
            return instance;
        }

        public static Course Create(string name, int year, int semester)
        {
            var instance = new Course { Id = Guid.NewGuid() };
            instance.Update(name, year, semester);
            return instance;
        }

      

        public void Update(string name, int year, int semester, List<Lesson> lessons)
        {
            Name = name;
            Year = year;
            Semester = semester;
            Lessons = lessons;
        }
        public void Update(string name, int year, int semester)
        {
            Name = name;
            Year = year;
            Semester = semester;
        }

        public void Update(UserCourse userCourse)
        {
            if (UserCourses == null)
            {
                UserCourses = new List<UserCourse>(){userCourse};
            }
            else
            {
                UserCourses.Add(userCourse);
            }
        }

        public void Update(List<Lesson> lessons)
        {
            this.Lessons = lessons;
        }
    }
}