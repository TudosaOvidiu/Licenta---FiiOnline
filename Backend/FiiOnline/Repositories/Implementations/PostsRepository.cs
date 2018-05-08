using System;
using System.Collections.Generic;
using System.Linq;
using Business.Repositories.Intefaces;
using CreatingModels;
using Data.Domain.Entities;
using Data.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Business.Repositories.Implementations
{
    public class PostsRepository : ACrudRepository<Post, Guid>, IPostsRepository
    {
        private readonly IUsersRepository _usersRepository;

        public PostsRepository(IDatabaseContext databaseContext, IUsersRepository usersRepository) : base(databaseContext)
        {
            _usersRepository = usersRepository;
        }

        public override Post GetById(Guid id)
        {
            return _databaseContext.Posts.Include(p => p.Professor).FirstOrDefault(p => p.Id.Equals(id));
        }

        public  void Create(PostCreatingModel entity)
        {
            var post = Post.CreatePost(entity.Title, entity.Description, entity.CourseGuid);
            if (_databaseContext.Professors.FirstOrDefault(p => p.Id.Equals(entity.AuthorGuid)) != null)
            {
                var professor = _databaseContext.Professors.FirstOrDefault(p => p.Id.Equals(entity.AuthorGuid));
                post.Update(entity.AuthorGuid, professor);
                professor.Update(post);

                _databaseContext.Professors.Update(professor);
                _databaseContext.SaveChanges();
            }
            else
            {
                post.Update(entity.AuthorGuid);

                _databaseContext.Posts.Add(post);
                _databaseContext.SaveChanges();
            }
        }

        public List<Post> GetPostsForStudent(int offset, int limit, string studentId)
        {
            List<Guid> userFollwedCourses = _usersRepository.GetStudentFollowedCourses(studentId);
            userFollwedCourses.Add(new Guid("f720416f-9d57-41f0-b487-91b64926b106"));
            return _databaseContext.Posts.Include(p => p.Professor).Where(p => userFollwedCourses.Contains(p.CourseGuid))
                .OrderByDescending(p => p.Date)
                .Skip(offset)
                .Take(limit)
                .ToList();
        }

        public List<Post> GetProfessorPosts(int offset, int limit, string profId)
        {
            var prof = _databaseContext.Professors.Include(p => p.Posts).FirstOrDefault(p => p.Id.Equals(profId));
            return prof.Posts
                .OrderByDescending(p => p.Date)
                .Skip(offset)
                .Take(limit)
                .ToList();
        }

        public List<Post> GetAdminPosts(int offset, int limit)
        {
            return _databaseContext.Posts.Where(p => p.AuthorGuid.Equals("f720416f-9d57-41f0-b487-91b64926b106"))
                .OrderByDescending(p => p.Date)
                .Skip(offset)
                .Take(limit)
                .ToList();
        }
    }
}