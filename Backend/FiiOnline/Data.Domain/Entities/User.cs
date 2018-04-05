using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using CreatingModels;
using Microsoft.AspNetCore.Identity;

namespace Data.Domain.Entities
{
    public class User : IdentityUser
    {
        private User()
        {
        }

        public String FirstName { get; private set; }

        public String LastName { get; private set; }


        public int Year { get; private set; }

        public int Semester { get; private set; }

        public string Role { get; private set; }

        public ICollection<UserCourse> UserCourses { get; private set; }

        public static User Create(string firstName, string lastName, string username, string email, int year, int semester, string role)
        {
            var instance = new User
            {
                Id = Guid.NewGuid().ToString(),
//                UserCourses = new List<UserCourse>()
            };
            instance.Update(firstName, lastName, username, email, year, semester, role);
            return instance;
        }

        public void Update(string firstName, string lastName, string username, string email, int year, int semester, string role)
        {
            FirstName = firstName;
            LastName = lastName;
            UserName = username;
            Email = email;
            Year = year;
            Semester = semester;
            Role = role;
        }

        public void Update(UserCreatingModel model)
        {
            this.UserName = model.Username;

            this.FirstName = model.FirstName;

            this.LastName = model.LastName;

            this.Email = model.Email;

            this.Year = model.Year;

            this.Semester = model.Semester;

        }

        public void Update(UserCourse userCourse)
        {
            if (UserCourses == null)
            {
                UserCourses = new List<UserCourse>() {userCourse};
            }
            else
            {
                UserCourses.Add(userCourse);
            }
        }
    }
}