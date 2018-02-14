using System;
using System.Runtime.CompilerServices;
using Data.Domain.Entities;

namespace Business.Repositories.Intefaces
{
    public interface ICoursesRepository: ICrudRepository<Course, Guid>
    {
        void AddCoursToProfessor(string profId, Guid coursId);

    }
}