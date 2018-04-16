using System;
using System.Threading.Tasks;
using CreatingModels;
using Data.Domain.Entities;

namespace Business.Repositories.Intefaces
{
    public interface IResourcesRepository: ICrudRepository<Resource, Guid>
    {
        Task Create(LessonCreatingModel model);

        void DeleteFile(FileCreatingModel file);

        Task Update(LessonCreatingModel model, Guid id);

        AppFile GetFileById(Guid id);

    }
}