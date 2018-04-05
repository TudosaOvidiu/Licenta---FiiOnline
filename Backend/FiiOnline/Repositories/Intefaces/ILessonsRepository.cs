using System;
using System.Threading.Tasks;
using CreatingModels;
using Data.Domain.Entities;

namespace Business.Repositories.Intefaces
{
    public interface ILessonsRepository: ICrudRepository<Lesson, Guid>
    {
        Task Create(LessonCreatingModel model);

        void DeleteFile(FileCreatingModel file);

        Task Update(LessonCreatingModel model, Guid id);

    }
}