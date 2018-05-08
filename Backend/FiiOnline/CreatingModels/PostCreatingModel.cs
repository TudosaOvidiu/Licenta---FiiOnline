using System;

namespace CreatingModels
{
    public class PostCreatingModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid CourseGuid { get; set; }
        public string AuthorGuid { get; set; }
    }
}