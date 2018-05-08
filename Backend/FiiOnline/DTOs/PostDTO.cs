using System;

namespace DTOs
{
    public class PostDTO
    {
        public Guid Id { get; set; }
        public string Title { get;  set; }
        public string Description { get;  set; }
        public DateTime Date { get;  set; }
        public string Author { get; set; }
        public string AuthorPicture { get; set; }
        public Guid CourseGuid { get; set; }

        public PostDTO(Guid id, string title, string description, DateTime date, string author, string authorPicture, Guid courseGuid)
        {
            Id = id;
            Title = title;
            Description = description;
            Date = date;
            Author = author;
            AuthorPicture = authorPicture;
            CourseGuid = courseGuid;
        }
    }
}