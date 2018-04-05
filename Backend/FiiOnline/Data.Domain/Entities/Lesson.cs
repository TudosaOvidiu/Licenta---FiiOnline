using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using CreatingModels;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Data.Domain.Entities
{
    public class Lesson
    {
        private Lesson() { }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public DateTime Date { get; private set; }

        [ForeignKey("Courses")]
        public Guid CourseId { get; private set; }
        public Course Course { get; private set; }

        public ICollection<AppFile> Files { get; private set; }

        public static Lesson Create(string name, string description, DateTime date, Guid courseId, Course course)
        {
            var instance = new Lesson { Id = Guid.NewGuid() };
            instance.Update(name, description, date, courseId, course);
            return instance;
        }

        public void Update(string name, string description, DateTime date)
        {
            Name = name;
            Description = description;
            Date = date;
        }

        public void Update(string name, string description, DateTime date, Guid courseId, Course course)
        {
            Name = name;
            Description = description;
            Date = date;
            CourseId = Id;
            Course = course;
        }

        public void AddFiles(ICollection<AppFile> files)
        {
            this.Files = files;
        }

        public void RemoveFile(AppFile file)
        {
            this.Files.Remove(file);
        }
    }
}