using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Business.Services.Interfaces;
using CreatingModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{id}")]
        public IActionResult GetCours([FromRoute] Guid id)
        {
            var user = _coursesService.GetById(id);
            if (user == null)
                return NotFound("There is no user with that id");
            return Ok(user);
        }

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

       
    }
}