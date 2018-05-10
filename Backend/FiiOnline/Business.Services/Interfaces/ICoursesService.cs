using System;
using System.Collections.Generic;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

namespace Business.Services.Interfaces
{
    public interface ICoursesService: ICrudService<Course, CourseCreatingModel, CourseDTO, Guid>
    {
        void AddCoursToProfessor(string profId, Guid coursId);

        List<WeekDTO> GetCourseWeeks(Guid id);

        IEnumerable<CourseDTO> GetCoursesByYear(string year);

        IEnumerable<CourseDTO> GetProfessorCourses(string id);

        void FollowCourse(string studentId, Guid courseId);

        List<StudentDTO> GetCourseFollowers(int offset, int limit, Guid courseId);

        List<CourseDTO> GetStudentCourses(string id);
    }
}