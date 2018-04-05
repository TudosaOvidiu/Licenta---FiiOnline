using System;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Data.Domain.Entities
{
    public class UserCourse
    {
        private UserCourse() { }

        public string UserId { get; private set; }
        public User User { get; private set; }

        public Guid CourseId { get; private set; }
        public Course Course { get; private set; }

        public static UserCourse CreateUserCourse(string userId, User user, Guid coursId, Course course)
        {
            var instance = new UserCourse
            {
                User = user
            };
            return instance;
        }
    }
}