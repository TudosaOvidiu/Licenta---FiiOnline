using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CreatingModels;
using Data.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Business.Repositories.Intefaces
{
    public interface IUsersRepository: ICrudRepository<User, string>
    {
        Task<IdentityResult> CreateAsync(UserCreatingModel model);

        List<User> GetUsers();

        User GetByUserName(string name);

        int GetNumberOfSimiliarNames(string name);

        List<Professor> GetProfessors();

        Professor GetProfessorById(string id);

        void UpdateStudent(string id, UserCreatingModel model);

        void UpdateProfessor(string id, UserCreatingModel model);

        List<Guid> GetStudentFollowedCourses(string id);


    }
}