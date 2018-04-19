using System;
using System.Collections.Generic;

namespace CreatingModels
{
    public class CourseCreatingModel
    {
        public string Name { get; set; }
        public string Year { get; set; }
        public int Semester { get; set; }
        public string Description { get; set; }
        public List<string> ProfessorsGUIDs { get; set; }
        
    }
}