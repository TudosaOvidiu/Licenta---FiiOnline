using System;
using System.Collections.Generic;

namespace CreatingModels
{
    public class UserCreatingModel
    {
        public String Username { get; set; }

        public String Password { get; set; }

        public String ConfirmPassword { get; set; }

        public String FirstName { get; set; }

        public String LastName { get; set; }

        public String Email { get; set; }

        public int Year { get; set; }

        public int Semester { get; set; }

        public String Role { get; set; }




        public UserCreatingModel()
        {

        }

    }
}
