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

        IEnumerable<Course> GetCoursesByYear(string year);

        void FollowCourse(string studentId, Guid courseId);

        List<StudentCourse> GetCourseFollowers(int offset, int limit, Guid courseId);

        List<StudentCourse> GetStudentCourses(string id);

    }
}