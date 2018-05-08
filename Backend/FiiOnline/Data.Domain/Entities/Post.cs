using System;

namespace Data.Domain.Entities
{
    public class Post
    {
        private Post() {}

        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public DateTime Date { get; private set; }
        public Guid CourseGuid { get; private set; }

        public string AuthorGuid { get; private set; }
        public Professor Professor { get; private set; }

        public static Post CreatePost(string title, string description, Guid courseGuid)
        {
            var instance = new Post
            {
                Id = Guid.NewGuid(),
                Date = DateTime.Now
            };
            instance.Update(title, description, courseGuid);

            return instance;
        }

        public void Update(string title, string description, Guid courseGuid)
        {
            this.Title = title;
            this.Description = description;
            this.CourseGuid = courseGuid;
        }

        public void Update(string profGuid, Professor professor)
        {
            this.AuthorGuid = profGuid;
            this.Professor = professor;
        }

        public void Update(string adminGuid)
        {
            this.AuthorGuid = adminGuid;
        }
    }
}