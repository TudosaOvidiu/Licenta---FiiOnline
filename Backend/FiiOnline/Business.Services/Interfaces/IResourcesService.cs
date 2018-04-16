using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

namespace Business.Services.Interfaces
{
    public interface IResourcesService: ICrudService<Resource, Resource, ResourceDTO, Guid>
    {
        Task Create(LessonCreatingModel model);

        void DeleteFile(FileCreatingModel file);

        Task Update(LessonCreatingModel model, Guid id);

        List<ResourceDTO> GetCourseLessons(Guid courseId);

        AppFile GetFileById(Guid id);

        string GetContentType(string path);

    }
}