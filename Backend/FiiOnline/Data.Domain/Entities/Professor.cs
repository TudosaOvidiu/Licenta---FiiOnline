using System;
using System.Collections.Generic;

namespace Data.Domain.Entities
{
    public class Professor: User
    {
        private Professor()
        {
        }

        public ICollection<ProfessorCourse> UserCourses { get; private set; }

        public static Professor Create(string firstName, string lastName, string username, string email, string role)
        {
            var instance = new Professor()
            {
                Id = Guid.NewGuid().ToString(),
                UserCourses = new List<ProfessorCourse>()
            };
            instance.Update(firstName, lastName, username, email, role);
            return instance;
        }

        public void Update(ProfessorCourse userCourse)
        {
            if (UserCourses == null)
            {
                UserCourses = new List<ProfessorCourse>() { userCourse };
            }
            else
            {
                UserCourses.Add(userCourse);
            }
        }
    }
}