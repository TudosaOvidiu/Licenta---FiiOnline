using System;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

namespace Business.Services.Interfaces
{
    public interface ICoursesService: ICrudService<Course, CourseCreatingModel, CourseDTO, Guid>
    {
        void AddCoursToProfessor(string profId, Guid coursId);

    }
}