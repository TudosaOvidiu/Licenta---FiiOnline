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

        IEnumerable<CourseDTO> GetCoursesByYearAndSemester(string year, int semester);

        IEnumerable<CourseDTO> GetProfessorCourses(string id);

    }
}