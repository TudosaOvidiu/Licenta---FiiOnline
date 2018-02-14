using System.Collections.Generic;
using System.Threading.Tasks;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;
using Microsoft.AspNetCore.Identity;

namespace Business.Services.Implementations
{
    public class UsersService : IUsersService

    {
        private readonly IUsersRepository _usersRepository;

        public UsersService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public async Task<IdentityResult> CreateAsync(UserCreatingModel model, UserManager<User> userManager) =>
            await _usersRepository.CreateAsync(model, userManager);
 

        public List<User> GetUsers() => _usersRepository.GetUsers();

        public User GetByName(string name) => _usersRepository.GetByName(name);
        public User GetById(string id) => _usersRepository.GetById(id);

        public void Update(UserCreatingModel model, string id)
        {
            var user = _usersRepository.GetById(id);
            user.Update(model);
            _usersRepository.Update(user);
        }

        public void Create(UserCreatingModel entity)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            return _usersRepository.GetAll();
        }


        public void Delete(string id)
        {
            _usersRepository.Delete(id);
        }
    }
}