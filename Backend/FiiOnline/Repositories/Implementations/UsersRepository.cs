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
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Business.Repositories.Implementations
{
    public class UsersRepository : ACrudRepository<User, string>, IUsersRepository
    {
        private readonly UserManager<User> _userManager;

        public UsersRepository(IDatabaseContext databaseContext, UserManager<User> userManager) : base(databaseContext)
        {
            _userManager = userManager;
        }

        public Professor GetProfessorById(string id) => _databaseContext.Professors.Include(p => p.UserCourses)
            .ThenInclude(uc => uc.Course).FirstOrDefault(p => p.Id.Equals(id));

        public Student GetStudentById(string id) => _databaseContext.Students.FirstOrDefault(s => s.Id.Equals(id));

        public async Task<IdentityResult> CreateAsync(UserCreatingModel model)
        {
            if (model.Role.Equals("Student"))
            {
                var user = Student.Create(model.FirstName, model.LastName, model.Username, model.Email, model.Role,
                    model.Year, model.Semester, model.ImageURL);

                if (model.Password != model.ConfirmPassword)
                    throw new ArgumentException("Passwords do not match!");
                // Add the user to the Db with the choosen password
                var response = await _userManager.CreateAsync(user, model.Password);

                await _userManager.AddToRoleAsync(user, model.Role);
                _databaseContext.SaveChanges();

                return response;
            }
            else
            {
                var user = Professor.Create(model.FirstName, model.LastName, model.Username, model.Email, model.Role,
                    model.ImageURL);

                if (model.Password != model.ConfirmPassword)
                    throw new ArgumentException("Passwords do not match!");
                // Add the user to the Db with the choosen password
                var response = await _userManager.CreateAsync(user, model.Password);

                await _userManager.AddToRoleAsync(user, model.Role);
                _databaseContext.SaveChanges();

                return response;
            }
        }

        public List<User> GetUsers() =>
            _databaseContext.Users.ToList();

        public User GetByUserName(string userName) =>
            _databaseContext.Users.FirstOrDefault(u => u.UserName.Equals(userName));

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

        public List<Professor> GetProfessors() => _databaseContext.Professors.ToList();

        public void UpdateStudent(string id, UserCreatingModel model)
        {
            var student = _databaseContext.Students.FirstOrDefault(u => u.Id.Equals(id));
            student.Update(model.FirstName, model.LastName, student.UserName, model.Email, student.Role,
                model.ImageURL);
            student.Update(model.Year, model.Semester);

            _databaseContext.Students.Update(student);
            _databaseContext.SaveChanges();
        }

        public void UpdateProfessor(string id, UserCreatingModel model)
        {
            var professor = _databaseContext.Professors.FirstOrDefault(p => p.Id.Equals(id));
            professor.Update(model.FirstName, model.LastName, professor.UserName, model.Email, professor.Role,
                model.ImageURL);

            _databaseContext.Professors.Update(professor);
            _databaseContext.SaveChanges();
        }

        public List<Guid> GetStudentFollowedCourses(string id)
        {
            var student = _databaseContext.Students.Include(s => s.FollowingCourses).ThenInclude(sc => sc.Course)
                .FirstOrDefault(s => s.Id.Equals(id));
            List<Guid> coursesGuids = new List<Guid>();
            foreach (var studentCourse in student.FollowingCourses)
            {
                coursesGuids.Add(studentCourse.CourseId);
            }

            return coursesGuids;
        }

    }
}