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
        Task<IdentityResult> CreateAsync(UserCreatingModel model, UserManager<User> userManager);
        List<User> GetUsers();
        User GetByName(string name);
    }
}