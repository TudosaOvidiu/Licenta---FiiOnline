using System;
using System.Collections.Generic;
using CreatingModels;
using Data.Domain.Entities;

namespace Business.Repositories.Intefaces
{
    public interface IPostsRepository: ICrudRepository<Post, Guid>
    {
        void Create(PostCreatingModel entity);

        List<Post> GetPostsForStudent(int offset, int limit, string studentId);

        List<Post> GetProfessorPosts(int offset, int limit, string profId);

        List<Post> GetAdminPosts(int offset, int limit);
    }
}