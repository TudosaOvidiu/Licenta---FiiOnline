using System;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace Data.Domain.Entities
{
    public class AppFile
    {
        private AppFile()
        {
        }

        public Guid Id { get; set;}
        public string Name { get; private set; }
        public string Path { get; private set; }

        public Guid LessonId { get; private set; }
        public Resource Lesson { get; private set; }

        public static AppFile Create(Guid id, string name, string path)
        {
            var instance = new AppFile
            {
                Id = id,
                Name = name,
                Path = path,
            };

            return instance;
        }

        public void Update(Guid lessonId, Resource lesson)
        {
            this.LessonId = lessonId;
            this.Lesson = lesson;
        }
    }
}