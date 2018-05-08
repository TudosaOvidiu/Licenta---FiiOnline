using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Data.Domain.Entities;

namespace Business.Repositories.Intefaces
{
    public interface ICoursesRepository: ICrudRepository<Course, Guid>
    {
        void AddCoursToProfessor(string profId, Guid coursId);

        Course RemoveUserCoursesList(Course course);

        IEnumerable<Course> GetCoursesByYearAndSemester(string year, int semester);

        void FollowCourse(string studentId, Guid courseId);

    }
}