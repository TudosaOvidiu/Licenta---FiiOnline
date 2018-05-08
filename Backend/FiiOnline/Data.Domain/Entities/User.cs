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
        

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public string Role { get; private set; }

        public string ImageURL { get; private set; }


        public static User Create(string firstName, string lastName, string username, string email, string role, string imageURL)
        {
            var instance = new User
            {
                Id = Guid.NewGuid().ToString(),
            };
            instance.Update(firstName, lastName, username, email, role, imageURL);
            return instance;
        }

        public void Update(string firstName, string lastName, string username, string email, string role, string imageURL)
        {
            FirstName = firstName;
            LastName = lastName;
            UserName = username;
            Email = email;
            Role = role;
            ImageURL = imageURL;
        }

        public void Update(UserCreatingModel model)
        {
            this.UserName = model.Username;

            this.FirstName = model.FirstName;

            this.LastName = model.LastName;

            this.Email = model.Email;


        }

    }
}