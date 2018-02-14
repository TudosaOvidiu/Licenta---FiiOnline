using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Repositories.Intefaces;
using CreatingModels;
using Data.Domain.Entities;
using Data.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Business.Repositories.Implementations
{
    public class UsersRepository: ACrudRepository<User, string>, IUsersRepository
    {

        public UsersRepository(IDatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public async Task<IdentityResult> CreateAsync(UserCreatingModel model, UserManager<User> userManager)
        {
            var user = User.Create(model.Name, model.Username, model.Email);
            if (model.Password != model.ConfirmPassword)
                throw new ArgumentException("Passwords do not match!");
            // Add the user to the Db with the choosen password
            var response = await userManager.CreateAsync(user, model.Password);

            await userManager.AddToRoleAsync(user, model.Role);
            _databaseContext.SaveChanges();

            return response;
        }

        public List<User> GetUsers() =>
            _databaseContext.Users.ToList();

        public User GetByName(string name) => _databaseContext.Users.FirstOrDefault(u => u.Name.Equals(name));


    }
}