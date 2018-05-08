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
        public string Year { get; private set; }
        public int Semester { get; private set; }
        public string Description { get; private set; }

        public List<Week> Weeks { get; private set; }
        public ICollection<ProfessorCourse> UserCourses { get; private set; }
        public ICollection<StudentCourse> StudentCourse { get; private set; }

        public static Course Create(string name, string year, int semester, List<Week> weeks, string description)
        {
            var instance = new Course { Id = Guid.NewGuid() };
            instance.Update(name, year, semester, weeks, description);
            return instance;
        }

        public static Course Create(string name, string year, int semester, string description)
        {
            var instance = new Course { Id = Guid.NewGuid() };
            instance.Update(name, year, semester, description);
            return instance;
        }

      

        public void Update(string name, string year, int semester, List<Week> weeks, string description)
        {
            Name = name;
            Year = year;
            Semester = semester;
            Weeks = weeks;
            Description = description;
        }
        public void Update(string name, string year, int semester, string description)
        {
            Name = name;
            Year = year;
            Semester = semester;
            Weeks = new List<Week>();
            Description = description;
        }

        public void Update(ProfessorCourse userCourse)
        {
            if (UserCourses == null)
            {
                UserCourses = new List<ProfessorCourse>(){userCourse};
            }
            else
            {
                UserCourses.Add(userCourse);
            }
        }

        public void Update(StudentCourse studentCourse)
        {
            if (StudentCourse == null)
            {
                StudentCourse = new List<StudentCourse>() {studentCourse};
            }
            else
            {
                StudentCourse.Add(studentCourse);
            }
        }

        public void AddWeek(Week week)
        {
            if (Weeks == null)
            {
                this.Weeks = new List<Week>() { week };
            }
            else
            {
                this.Weeks.Add(week);
            }
        }

        

        public void RemoveProfFromCourse(ProfessorCourse userCourse)
        {
            this.UserCourses.Remove(userCourse);
        }

        public void RemoveStudentFromCourse(StudentCourse studentCourse)
        {
            this.StudentCourse.Remove(studentCourse);
        }

    }
}