using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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
            var user = User.Create(model.FirstName, model.LastName, model.Username, model.Email, model.Year, model.Semester);
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

        public User GetByUserName(string userName) => _databaseContext.Users.FirstOrDefault(u => u.UserName.Equals(userName));

        public int GetNumberOfSimiliarNames(string firstName)
        {
            var users = from u in _databaseContext.Users
                where u.FirstName.StartsWith(firstName)
                select u;

            int max = 0;
            foreach (var user in users)
            {
                int extractedNumber = Int32.Parse(Regex.Match(user.UserName, @"\d+").Value);
                max = (extractedNumber > max) ? extractedNumber : max;
            }

            return max;
        }
    }
}