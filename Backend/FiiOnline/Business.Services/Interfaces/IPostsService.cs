using System;
using System.Collections.Generic;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

namespace Business.Services.Interfaces
{
    public interface IPostsService: ICrudService<Post, PostCreatingModel, PostDTO, Guid>
    {
        List<PostDTO> GetPostsForStudent(int offset, int limit, string studentId);

        List<PostDTO> GetProfessorPosts(int offset, int limit, string profId);

        List<PostDTO> GetAdminPosts(int offset, int limit);
    }
}