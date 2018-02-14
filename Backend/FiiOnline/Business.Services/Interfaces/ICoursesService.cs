using System;
using CreatingModels;
using Data.Domain.Entities;

namespace Business.Services.Interfaces
{
    public interface ICoursesService: ICrudService<Course, CourseCreatingModel, CourseCreatingModel, Guid>
    {
        void AddCoursToProfessor(string profId, Guid coursId);

    }
}