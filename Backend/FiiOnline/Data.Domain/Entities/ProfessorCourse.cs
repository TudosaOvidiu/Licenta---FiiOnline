using System;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Data.Domain.Entities
{
    public class ProfessorCourse
    {
        private ProfessorCourse() { }

        public string ProfessorId { get; private set; }
        public Professor Professor { get; private set; }

        public Guid CourseId { get; private set; }
        public Course Course { get; private set; }

        public static ProfessorCourse CreateUserCourse(string userId, Professor professor, Guid coursId, Course course)
        {
            var instance = new ProfessorCourse
            {
                Professor = professor,
            };
            return instance;
        }
    }
}