using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FiiOnline.Controllers
{
    [Produces("application/json")]
    [Route("Lessons")]
    public class ResourcesController : Controller
    {
        private readonly IResourcesService _lessonsService;

        public ResourcesController(IResourcesService lessonsService)
        {
            _lessonsService = lessonsService;
        }

        [Authorize(Roles = "Professor")]
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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var lessons = _lessonsService.GetAll();
            if (lessons == null)
            {
                return NotFound("There are no users");
            }


            return Ok(lessons);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetLesson([FromRoute] Guid id)
        {
            var lesson = _lessonsService.GetById(id);
            if (lesson == null)
                return NotFound("There is no user with that id");
            return Ok(lesson);
        }

        [Authorize]
        [HttpGet("course-lessons/{id}")]
        public IActionResult GetCourseLessons([FromRoute] Guid id)
        {
            var lessons = _lessonsService.GetCourseLessons(id);
            if (lessons == null)
                return NotFound("There is no user with that id");
            return Ok(lessons);
        }

        [Authorize(Roles = "Professor")]
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

        [Authorize]
        [HttpGet("download-file/{id}")]
        public async Task<IActionResult> DownloadFileAsync([FromRoute] Guid id)
        {
            var file = _lessonsService.GetFileById(id);

            var memory = new MemoryStream();
            using (var stream = new FileStream(file.Path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            return File(memory, _lessonsService.GetContentType(file.Path), file.Name);
        }

        [Authorize(Roles = "Professor")]
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

        [Authorize(Roles = "Professor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            try
            {
                _lessonsService.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}