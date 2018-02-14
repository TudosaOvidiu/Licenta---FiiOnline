using System;
using System.Collections.Generic;
using System.Linq;
using Business.Repositories.Intefaces;
using CreatingModels;
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

        public override IReadOnlyList<Course> GetAll() => _databaseContext.Courses.Include(c => c.Lessons).Include(p => p.UserCourses).ToList();

        public override Course GetById(Guid id) 
            => _databaseContext.Courses.Include(c => c.Lessons).AsNoTracking().FirstOrDefault(c => c.Id.Equals(id));

        public void AddCoursToProfessor(string profId, Guid coursId)
        {
            var professor = _databaseContext.Users.AsNoTracking().FirstOrDefault(u => u.Id.Equals(profId));
            var course = GetById(coursId);
            var profCourse = UserCourse.CreateUserCourse(profId, professor, coursId, course);
//            _databaseContext.Users.Remove(professor);
//            _databaseContext.Courses.Remove(course);
            _databaseContext.UserCourses.Add(profCourse);
            professor.Update(profCourse);
//            _databaseContext.Users.Update(professor);
//            course.Update(profCourse);
//            _databaseContext.Courses.Update(course);
            _databaseContext.SaveChanges();
        }

    }
}