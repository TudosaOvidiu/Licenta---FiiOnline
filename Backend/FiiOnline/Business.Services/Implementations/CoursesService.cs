using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

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
           
            _coursesRepository.Create(course);
            foreach (var prof in entity.ProfessorsGUIDs)
            {
                _coursesRepository.AddCoursToProfessor(prof, course.Id);
            }
        }

        public void Update(CourseCreatingModel entity, Guid id)
        {
            var course = _coursesRepository.GetById(id);

            course.Update(entity.Name, entity.Year, entity.Semester);
            course =_coursesRepository.RemoveUserCoursesList(course);
            foreach (var prof in entity.ProfessorsGUIDs)
            {
                _coursesRepository.AddCoursToProfessor(prof, course.Id);
            }
            _coursesRepository.Update(course);
        }

        public IEnumerable<Course> GetAll()
        {
            return _coursesRepository.GetAll();
        }


        public CourseDTO GetById(Guid id)
        {
            var course = _coursesRepository.GetById(id);
            List<string> profNames = new List<string>();
            List<string> profGuids = new List<string>();
            foreach (var userCourse in course.UserCourses)
            {
                profNames.Add(string.Format("{0} {1}", userCourse.User.FirstName, userCourse.User.LastName));
                profGuids.Add(userCourse.UserId);
            }
            CourseDTO courseDTO = new CourseDTO(course.Id, course.Name, "Description", course.Year, course.Semester, profNames, profGuids);

            return courseDTO;
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