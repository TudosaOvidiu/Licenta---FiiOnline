using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Business.Services.Interfaces;
using CreatingModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace FiiOnline.Controllers
{
    [Produces("application/json")]
    [Route("/Courses")]
    public class CoursesController : Controller
    {
        private readonly ICoursesService _coursesService;

        public CoursesController(ICoursesService coursesService)
        {
            _coursesService = coursesService;
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public IActionResult PostCourse([FromBody] CourseCreatingModel courseModel)
        {
            try
            {
                _coursesService.Create(courseModel);
                return StatusCode((int)HttpStatusCode.Created);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetCourses()
        {
            var courses = _coursesService.GetAll();
            if (courses == null)
            {
                return NotFound("There are no users");
            }


            return Ok(courses);
        }

        [Authorize]
        [HttpGet("course-weeks/{id}")]
        public IActionResult GetCourseWeeks([FromRoute] Guid id)
        {
            try
            {
                var weeks = _coursesService.GetCourseWeeks(id);
                return Ok(weeks);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [Authorize(Roles = "Administrator, Student")]
        [HttpGet("course-by-semester")]
        public IActionResult GetCoursesBySemester(string year = "", int semester = 0)
        {
            try
            {
                var courses = _coursesService.GetCoursesByYearAndSemester(year, semester);
                return Ok(courses);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize(Roles = "Professor")]
        [HttpGet("professor-courses/{id}")]
        public IActionResult GetProfessorCourses([FromRoute] string id)
        {
            try
            {
                var courses = _coursesService.GetProfessorCourses(id);
                return Ok(courses);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public IActionResult DeleteCours([FromRoute] Guid id)
        {
            try
            {
                _coursesService.Delete(id);
                return StatusCode((int)HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetCours([FromRoute] Guid id)
        {
            var user = _coursesService.GetById(id);
            if (user == null)
                return NotFound("There is no user with that id");
            return Ok(user);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public IActionResult UpdateCours([FromBody] CourseCreatingModel courseModel, [FromRoute] Guid id)
        {

            try
            {
                _coursesService.Update(courseModel, id);
                return StatusCode((int)HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Roles = "Professor")]
        [HttpPut("professors-courses")]
        public IActionResult UpdateProfessorsCourses(string ProfessorId, Guid CoursId)
        {

            try
            {
                _coursesService.AddCoursToProfessor(ProfessorId, CoursId);
                return StatusCode((int)HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("follower")]
        public IActionResult StudentFollowsCourse(string studentId = "", string courseId = "")
        {
            try
            {
                _coursesService.FollowCourse(studentId, new Guid(courseId));
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

       
    }
}