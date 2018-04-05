using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;
using Microsoft.AspNetCore.Identity;

namespace Business.Services.Interfaces
{
    public interface IUsersService: ICrudService<User, UserCreatingModel, UserDTO, string>
    {
        Task<IdentityResult> CreateAsync(UserCreatingModel model, UserManager<User> userManager);
        Task<List<UserDTO>> GetUsers();
        User GetByUserName(string name);
        int GetNumberOfSimilarNames(string firstName);
        Task<List<UserDTO>> GetProfessors();
    }
}