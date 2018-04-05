using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FiiOnline.Controllers
{
    [Produces("application/json")]
    [Route("Lessons")]
    public class LessonsController : Controller
    {
        private readonly ILessonsService _lessonsService;

        public LessonsController(ILessonsService lessonsService)
        {
            _lessonsService = lessonsService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(LessonCreatingModel model)
        {
            try
            {
                await _lessonsService.Create(model);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = _lessonsService.GetAll();
            if (courses == null)
            {
                return NotFound("There are no users");
            }


            return Ok(courses);
        }

        [HttpGet("{id}")]
        public IActionResult GetLesson([FromRoute] Guid id)
        {
            var user = _lessonsService.GetById(id);
            if (user == null)
                return NotFound("There is no user with that id");
            return Ok(user);
        }

        [HttpPut("delete-file")]
        public IActionResult DeleteFile([FromBody] FileCreatingModel file)
        {
            try
            {
                _lessonsService.DeleteFile(file);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(LessonCreatingModel model, [FromRoute] Guid id)
        {
            try
            {
                await _lessonsService.Update(model, id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}