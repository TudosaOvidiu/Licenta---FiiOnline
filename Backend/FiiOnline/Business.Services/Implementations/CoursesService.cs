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
        private readonly IUsersService _usersService;
        private readonly IWeeksService _weeksService;
        private readonly IUsersRepository _usersRepository;

        public CoursesService(ICoursesRepository coursesRepository, IUsersService usersService, IWeeksService weeksService, IUsersRepository usersRepository)
        {
            _coursesRepository = coursesRepository;
            _usersService = usersService;
            _weeksService = weeksService;
            _usersRepository = usersRepository;
        }


        public void Create(CourseCreatingModel entity)
        {
            var course = Course.Create(entity.Name, entity.Year, entity.Semester, entity.Description);
           
            _coursesRepository.Create(course);
            foreach (var prof in entity.ProfessorsGUIDs)
            {
                _coursesRepository.AddCoursToProfessor(prof, course.Id);
            }
        }

        public void Update(CourseCreatingModel entity, Guid id)
        {
            var course = _coursesRepository.GetById(id);

            course.Update(entity.Name, entity.Year, entity.Semester, entity.Description);
            course =_coursesRepository.RemoveUserCoursesList(course);
            foreach (var prof in entity.ProfessorsGUIDs)
            {
                _coursesRepository.AddCoursToProfessor(prof, course.Id);
            }
            _coursesRepository.Update(course);
        }

        public IEnumerable<CourseDTO> GetAll()
        {
            var courses = _coursesRepository.GetAll();
            List<CourseDTO> courseDtos = new List<CourseDTO>();
            foreach (var course in courses)
            {
                courseDtos.Add(GetById(course.Id));
            }

            return courseDtos;
        }

        public IEnumerable<CourseDTO> GetCoursesByYearAndSemester(string year, int semester)
        {
            var courses = _coursesRepository.GetCoursesByYearAndSemester(year, semester);
            List<CourseDTO> courseDtos = new List<CourseDTO>();
            foreach (var course in courses)
            {
                courseDtos.Add(GetById(course.Id));
            }

            return courseDtos;
        }

        public IEnumerable<CourseDTO> GetProfessorCourses(string id)
        {
            var user = _usersRepository.GetProfessorById(id);
            List<CourseDTO> courseDtos = new List<CourseDTO>();
            foreach (var profCourse in user.UserCourses)
            {
                courseDtos.Add(GetById(profCourse.CourseId));
            }

            return courseDtos;
        }


        public CourseDTO GetById(Guid id)
        {
            var course = _coursesRepository.GetById(id);
            List < UserDTO > professors= new List<UserDTO>();
            foreach (var profCourse in course.UserCourses)
            {
                professors.Add(_usersService.GetById(profCourse.ProfessorId));
            }
            CourseDTO courseDTO = new CourseDTO(course.Id, course.Name, course.Description, course.Year, course.Semester, professors);

            return courseDTO;
        }

        public void FollowCourse(string studentId, Guid courseId)
        {
            _coursesRepository.FollowCourse(studentId, courseId);
        }

        public List<WeekDTO> GetCourseWeeks(Guid id)
        {
            var course = _coursesRepository.GetById(id);
            List<WeekDTO> weeksDtos = new List<WeekDTO>();
            foreach (var week in course.Weeks)
            {
                weeksDtos.Add(_weeksService.GetById(week.Id));
            }

            return weeksDtos;
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