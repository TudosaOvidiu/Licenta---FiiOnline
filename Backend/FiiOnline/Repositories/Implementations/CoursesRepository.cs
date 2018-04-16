using System;
using System.Collections.Generic;
using System.Linq;
using Business.Repositories.Intefaces;
using Data.Domain.Entities;
using Data.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Business.Repositories.Implementations
{
    public class CoursesRepository : ACrudRepository<Course, Guid>, ICoursesRepository
    {
        public CoursesRepository(IDatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public override IReadOnlyList<Course> GetAll() => _databaseContext.Courses.Include(c => c.Weeks).ThenInclude(w => w.Resources).ThenInclude(c => c.Files).Include(p => p.UserCourses).ThenInclude(uc =>uc.Professor).ToList();

        public override Course GetById(Guid id) 
            => _databaseContext.Courses.Include(c => c.Weeks).ThenInclude(w => w.Resources).Include(c => c.UserCourses).ThenInclude(uc => uc.Professor).FirstOrDefault(c => c.Id.Equals(id));

        public Course RemoveUserCoursesList(Course course)
        {
            var userCourses = new List<ProfessorCourse>(course.UserCourses);
            foreach (var userCourse in userCourses)
            {
                course.RemoveProfFromCourse(userCourse);
            }
            _databaseContext.Courses.Update(course);
            _databaseContext.SaveChanges();
            return course;
        }

        public void AddCoursToProfessor(string profId, Guid coursId)
        {
            var professor = _databaseContext.Professors.Include(u => u.UserCourses).FirstOrDefault(u => u.Id.Equals(profId));
            var course = GetById(coursId);
            
            var profCourse = ProfessorCourse.CreateUserCourse(profId, professor, coursId, course);

            course.Update(profCourse);

            _databaseContext.SaveChanges();
        }

    }
}