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
    public class LessonsService: ILessonsService
    {
        private readonly ILessonsRepository _lessonsRepository;

        public LessonsService(ILessonsRepository lessonsRepository)
        {
            _lessonsRepository = lessonsRepository;
        }


        public void Create(Lesson entity) => _lessonsRepository.Create(entity);

        public async Task Create(LessonCreatingModel model)
        {
            await _lessonsRepository.Create(model);
        }

        public void Update(Lesson entity, Guid id) => _lessonsRepository.Update(entity);

        public async Task Update(LessonCreatingModel model, Guid id)
        {
            await _lessonsRepository.Update(model, id);
        }

        public IEnumerable<Lesson> GetAll() => _lessonsRepository.GetAll();

        public LessonDTO GetById(Guid id)
        {
            var lesson = _lessonsRepository.GetById(id);
            List<string> filesNames = new List<string>();
            List<string> filesPaths = new List<string>();
            foreach (var file in lesson.Files)
            {
                filesNames.Add(file.Name);
                filesPaths.Add(file.Path);

            }
            LessonDTO lessonDto = new LessonDTO(lesson.Name, lesson.Description, lesson.Date, lesson.CourseId, filesNames, filesPaths);

            return lessonDto;
        }

        public void Delete(Guid id) => _lessonsRepository.Delete(id);

        public void DeleteFile(FileCreatingModel file)
        {
            _lessonsRepository.DeleteFile(file);
        }
    }
}