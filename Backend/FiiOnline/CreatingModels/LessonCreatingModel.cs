using System;

namespace CreatingModels
{
    public class LessonCreatingModel
    {
        public Guid Id { get; set; }
        public string Name { get;  set; }
        public string Path { get;  set; }
        public DateTime Date { get;  set; }
        public Guid CourseId { get;  set; }

    }
}