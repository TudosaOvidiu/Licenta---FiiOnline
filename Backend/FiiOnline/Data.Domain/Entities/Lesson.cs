using System;
using System.ComponentModel.DataAnnotations.Schema;
using CreatingModels;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Data.Domain.Entities
{
    public class Lesson
    {
        private Lesson() { }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Path { get; private set; }
        public DateTime Date { get; private set; }

        [ForeignKey("Courses")]
        public Guid CourseId { get; private set; }
        public Course Course { get; private set; }

        public static Lesson Create(string name, string path, DateTime date, Guid courseId, Course course)
        {
            var instance = new Lesson { Id = Guid.NewGuid() };
            instance.Update(name, path, date, courseId, course);
            return instance;
        }

        public static Lesson Create(LessonCreatingModel model, Course course)
        {
            var instance = new Lesson
            {
                Id = model.Id,
                Name = model.Name,
                Path = model.Path,
                Date = model.Date,
                CourseId = model.CourseId,
                Course = course
            };
            return instance;
        }

        public void Update(string name, string path, DateTime date, Guid courseId, Course course)
        {
            Name = name;
            Path = path;
            Date= date;
            CourseId = Id;
            Course = course;
        }
    }
}