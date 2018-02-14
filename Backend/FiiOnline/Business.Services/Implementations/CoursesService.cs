using System;
using System.Collections.Generic;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using Data.Domain.Entities;

namespace Business.Services.Implementations
{
    public class CoursesService: ICoursesService
    {
        private readonly ICoursesRepository _coursesRepository;

        public CoursesService(ICoursesRepository coursesRepository)
        {
            _coursesRepository = coursesRepository;
        }


        public void Create(CourseCreatingModel entity)
        {
            var course = Course.Create(entity.Name, entity.Year, entity.Semester);
            List<Lesson> listOfLessons = new List<Lesson>();
            foreach (var lesson in entity.Lessons)
            {
                var instance = Lesson.Create(lesson.Name, lesson.Path, lesson.Date, course.Id, course);
                listOfLessons.Add(instance);
            }

            course.Update(listOfLessons);
            _coursesRepository.Create(course);
        }

        public void Update(CourseCreatingModel entity, Guid id)
        {
            var course = _coursesRepository.GetById(id);

            List<Lesson> UpdatedLessons = new List<Lesson>();

            foreach (var lesson in entity.Lessons)
            {
                UpdatedLessons.Add(Lesson.Create(lesson, course));
            }
            course.Update(entity.Name, entity.Year, entity.Semester, UpdatedLessons);

            _coursesRepository.Update(course);
        }

        public IEnumerable<Course> GetAll()
        {
            return _coursesRepository.GetAll();
        }

        public Course GetById(Guid id)
        {
            return _coursesRepository.GetById(id);
        }

        public void Delete(Guid id)
        {
            _coursesRepository.Delete(id);
        }

        public void AddCoursToProfessor(string profId, Guid coursId)
        {
            _coursesRepository.AddCoursToProfessor(profId, coursId);
        }
    }
}