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

        public String Name { get; private set; }
        public ICollection<UserCourse> UserCourses { get; private set; }

        public static User Create(string name, string username, string email)
        {
            var instance = new User
            {
                Id = Guid.NewGuid().ToString(),
//                UserCourses = new List<UserCourse>()
            };
            instance.Update(name, username, email);
            return instance;
        }

        public void Update(string name, string username, string email)
        {
            Name = name;
            UserName = username;
            Email = email;
        }

        public void Update(UserCreatingModel model)
        {
            this.UserName = model.Username;

            this.Name = model.Name;

            this.Email = model.Email;
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