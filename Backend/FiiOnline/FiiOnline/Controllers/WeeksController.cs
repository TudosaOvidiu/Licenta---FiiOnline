using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Business.Services.Interfaces;
using CreatingModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FiiOnline.Controllers
{
    [Produces("application/json")]
    [Route("Weeks")]
    public class WeeksController : Controller
    {
        private readonly IWeeksService _weeksService;

        public WeeksController(IWeeksService weeksService)
        {
            _weeksService = weeksService;
        }

        [HttpPost]
        public IActionResult PostCourse([FromBody] WeekCreatingModel weekModel)
        {
            try
            {
                _weeksService.Create(weekModel);
                return StatusCode((int)HttpStatusCode.Created);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult GetWeeks()
        {
            var weeks = _weeksService.GetAll();
            if (weeks == null)
            {
                return NotFound("There are no users");
            }


            return Ok(weeks);
        }

        [HttpGet("{id}")]
        public IActionResult GetWeekById([FromRoute] Guid id)
        {
            try
            {
                var week = _weeksService.GetById(id);
                return Ok(week);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWeek([FromBody]WeekCreatingModel model, [FromRoute] Guid id)
        {
            try
            {
                _weeksService.Update(model, id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] Guid id)
        {
            try
            {
                _weeksService.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}