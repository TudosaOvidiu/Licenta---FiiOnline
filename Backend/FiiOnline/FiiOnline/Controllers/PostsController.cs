using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Services.Interfaces;
using CreatingModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.KeyVault.Models;

namespace FiiOnline.Controllers
{
    [Produces("application/json")]
    [Route("Posts")]
    public class PostsController : Controller
    {
        private readonly IPostsService _postsService;

        public PostsController(IPostsService postsService)
        {
            _postsService = postsService;
        }

        [HttpPost]
        public IActionResult PostPost([FromBody] PostCreatingModel postModel)
        {
            try
            {
                _postsService.Create(postModel);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("student-posts")]
        public IActionResult GetPostsForStudent(int offset = 0, int limit = 0, string studentId = "")
        {
            try
            {
                var posts = _postsService.GetPostsForStudent(offset, limit, studentId);
                return Ok(posts);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("professor-posts")]
        public IActionResult GetProfessorPosts(int offset = 0, int limit = 0, string id = "")
        {
            try
            {
                var posts = _postsService.GetProfessorPosts(offset, limit, id);
                return Ok(posts);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("admin-posts")]
        public IActionResult GetAdminPosts(int offset = 0, int limit = 0)
        {
            try
            {
                var posts = _postsService.GetAdminPosts(offset, limit);
                return Ok(posts);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetPostById([FromRoute] Guid id)
        {
            try
            {
                var post = _postsService.GetById(id);
                return Ok(post);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePost([FromRoute] Guid id, [FromBody] PostCreatingModel model)
        {
            try
            {
                _postsService.Update(model, id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePost([FromRoute] Guid id)
        {
            try
            {
                _postsService.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}