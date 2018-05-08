using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Business.Services.Implementations
{
    public class UsersService : IUsersService

    {
        private readonly IUsersRepository _usersRepository;
        private readonly IPostsService _postsService;

        public UsersService(IUsersRepository usersRepository, IPostsService postsService)
        {
            _usersRepository = usersRepository;
            _postsService = postsService;
        }

        public async Task<IdentityResult> CreateAsync(UserCreatingModel model) =>
            await _usersRepository.CreateAsync(model);


        public List<UserDTO> GetProfessors()
        {
            var users = _usersRepository.GetProfessors();
            List<UserDTO> userDTOs = new List<UserDTO>();

            foreach (var user in users)
            {
                userDTOs.Add(GetById(user.Id));
            }

            return userDTOs;
        }


        public User GetByUserName(string name) => _usersRepository.GetByUserName(name);

        public int GetNumberOfSimilarNames(string firstName) => _usersRepository.GetNumberOfSimiliarNames(firstName);


        public UserDTO GetById(string id)
        {
            var user = _usersRepository.GetById(id);
            UserDTO userDto = new UserDTO(user.Id, user.UserName, user.FirstName, user.LastName, user.Email, user.Role);
            return userDto;
        }

        public void Update(UserCreatingModel model, string id)
        {
            var user = _usersRepository.GetById(id);
            user.Update(model);
            _usersRepository.Update(user);
        }

        public void UpdateStudent(string id, UserCreatingModel model)
        {
            _usersRepository.UpdateStudent(id, model);
        }

        public void UpdateProfessor(string id, UserCreatingModel model)
        {
            _usersRepository.UpdateProfessor(id, model);
        }

        public void Create(UserCreatingModel entity)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<UserDTO> GetAll()
        {
            var users = _usersRepository.GetAll();
            List<UserDTO> userDTOs = new List<UserDTO>();

            foreach (var user in users)
            {
                userDTOs.Add(new UserDTO(user.Id, user.UserName, user.FirstName, user.LastName, user.Email,
                    user.Role));
            }

            return userDTOs;
        }

        public List<Guid> GetStudentFollowedCourses(string id)
        {
            return _usersRepository.GetStudentFollowedCourses(id);
        }

        public void Delete(string id)
        {
            _usersRepository.Delete(id);
        }
    }
}