using System;
using System.Collections.Generic;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using DTOs;

namespace Business.Services.Implementations
{
    public class PostsService: IPostsService
    {
        private readonly IPostsRepository _postsRepository;

        public PostsService(IPostsRepository postsRepository)
        {
            _postsRepository = postsRepository;
        }

        public void Create(PostCreatingModel entity)
        {
            _postsRepository.Create(entity);
        }

        public void Update(PostCreatingModel entity, Guid id)
        {
            var post = _postsRepository.GetById(id);
            post.Update(entity.Title, entity.Description, entity.CourseGuid);
            this._postsRepository.Update(post);
        }

        public IEnumerable<PostDTO> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<PostDTO> GetPostsForStudent(int offset, int limit, string studentId)
        {
            var posts = _postsRepository.GetPostsForStudent(offset, limit, studentId);
            List<PostDTO> postDtos = new List<PostDTO>();
            foreach (var post in posts)
            {
                postDtos.Add(GetById(post.Id));
            }

            return postDtos;
        }

        public List<PostDTO> GetProfessorPosts(int offset, int limit, string profId)
        {
            var posts = _postsRepository.GetProfessorPosts(offset, limit, profId);
            List<PostDTO> postDtos = new List<PostDTO>();
            foreach (var post in posts)
            {
                postDtos.Add(GetById(post.Id));
            }

            return postDtos;
        }

        public List<PostDTO> GetAdminPosts(int offset, int limit)
        {
            var posts = _postsRepository.GetAdminPosts(offset, limit);
            List<PostDTO> postDtos = new List<PostDTO>();
            foreach (var post in posts)
            {
                postDtos.Add(GetById(post.Id));
            }

            return postDtos;
        }

        public PostDTO GetById(Guid id)
        {
            var post = _postsRepository.GetById(id);
            string author;
            string authorPicture;
            if (post.Professor == null)
            {
                author = "Administration";
                authorPicture = "";
            }
            else
            {
                author = post.Professor.FirstName + ' ' + post.Professor.LastName;
                authorPicture = post.Professor.ImageURL;
            }

            return new PostDTO(post.Id, post.Title, post.Description, post.Date, author, authorPicture, post.CourseGuid);
        }

        public void Delete(Guid id)
        {
            _postsRepository.Delete(id);
        }
    }
}