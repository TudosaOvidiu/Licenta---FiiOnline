using System;
using System.Collections.Generic;

namespace CreatingModels
{
    public class CourseCreatingModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public int Semester { get; set; }
        public List<LessonCreatingModel> Lessons { get; set; }

        
    }
}