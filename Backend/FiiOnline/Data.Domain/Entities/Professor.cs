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
        public ICollection<Post> Posts { get; private set; }

        public static Professor Create(string firstName, string lastName, string username, string email, string role, string imageURL)
        {
            var instance = new Professor()
            {
                Id = Guid.NewGuid().ToString(),
                UserCourses = new List<ProfessorCourse>()
            };
            instance.Update(firstName, lastName, username, email, role, imageURL);
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

        public void Update(Post post)
        {
            if (Posts == null)
            {
                Posts = new List<Post>() { post };
            }
            else
            {
                Posts.Add(post);
            }
        }
    }
}