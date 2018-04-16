using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

namespace Business.Services.Implementations
{
    public class ResourcesService : IResourcesService
    {
        private readonly IResourcesRepository _lessonsRepository;
        private readonly ICoursesRepository _coursesRepository;

        public ResourcesService(IResourcesRepository lessonsRepository, ICoursesRepository coursesRepository)
        {
            _lessonsRepository = lessonsRepository;
            _coursesRepository = coursesRepository;
        }


        public void Create(Resource entity) => _lessonsRepository.Create(entity);

        public async Task Create(LessonCreatingModel model)
        {
            await _lessonsRepository.Create(model);
        }

        public void Update(Resource entity, Guid id) => _lessonsRepository.Update(entity);

        public async Task Update(LessonCreatingModel model, Guid id)
        {
            await _lessonsRepository.Update(model, id);
        }

        public IEnumerable<ResourceDTO> GetAll()
        {
            var lessons = _lessonsRepository.GetAll();
            List<ResourceDTO> lessonDtos = new List<ResourceDTO>();
            foreach (var lesson in lessons)
            {
                lessonDtos.Add(GetById(lesson.Id));
            }

            return lessonDtos;
        }

        public ResourceDTO GetById(Guid id)
        {
            var lesson = _lessonsRepository.GetById(id);
            List<FileDTO> fileDtos = new List<FileDTO>();
            try
            {
                foreach (var file in lesson.Files)
                {
                    fileDtos.Add(new FileDTO(file.Id, file.Name, file.Path));
                }
            }
            catch (Exception e)
            {
            }

            ResourceDTO lessonDto = new ResourceDTO(lesson.Id, lesson.Name, lesson.Description, lesson.Type,
                lesson.WeekId, fileDtos);

            return lessonDto;
        }

        public List<ResourceDTO> GetCourseLessons(Guid courseId)
        {
            List<ResourceDTO> listOfLessons = new List<ResourceDTO>();
            var course = _coursesRepository.GetById(courseId);
            foreach (var lesson in course.Weeks)
            {
                listOfLessons.Add(GetById(lesson.Id));
            }

            return listOfLessons;
        }

        public void Delete(Guid id)
        {
            var lesson = _lessonsRepository.GetById(id);
            var files = new List<AppFile>(lesson.Files);
            foreach (var file in files)
            {
                DeleteFile(new FileCreatingModel(file.Name, file.Path, id));
            }

            _lessonsRepository.Delete(id);
        }

        public void DeleteFile(FileCreatingModel file)
        {
            _lessonsRepository.DeleteFile(file);
        }

        public AppFile GetFileById(Guid id) => _lessonsRepository.GetFileById(id);

        public string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformats officedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }
    }
}