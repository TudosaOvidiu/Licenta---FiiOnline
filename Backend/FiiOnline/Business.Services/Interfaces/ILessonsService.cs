using System;
using System.Threading.Tasks;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

namespace Business.Services.Interfaces
{
    public interface ILessonsService: ICrudService<Lesson, Lesson, LessonDTO, Guid>
    {
        Task Create(LessonCreatingModel model);

        void DeleteFile(FileCreatingModel file);

        Task Update(LessonCreatingModel model, Guid id);

    }
}