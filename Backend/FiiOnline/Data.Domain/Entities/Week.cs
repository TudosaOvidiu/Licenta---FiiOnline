using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Data.Domain.Entities
{
    public class Week
    {
        private Week() { }

        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public DateTime Date { get; private set; }
        public int WeekNr { get; private set; }
        public string Description { get; private set; }

        public ICollection<Resource> Resources { get; private set; }

        [ForeignKey("Courses")]
        public Guid CourseId { get; private set; }
        public Course Course { get; private set; }

        public static Week Create(string title, DateTime date, int weekNr, string description, Guid courseId, Course course)
        {
            var instace = new Week {Id = Guid.NewGuid()};
            instace.Update(title, date, weekNr, description, courseId, course);

            return instace;
        }

        public void Update(string title, DateTime date, int weekNr, string description)
        {
            Title = title;
            Date = date;
            WeekNr = weekNr;
            Description = description;
        }

        public void Update(string title, DateTime date, int weekNr, string description, Guid courseId, Course course)
        {
            Title = title;
            Date = date;
            WeekNr = weekNr;
            Description = description;
            CourseId = courseId;
            Course = course;
        }

        public void AddResource(Resource resource)
        {
            if (Resources == null)
            {
                this.Resources = new List<Resource>() { resource };
            }
            else
            {
                this.Resources.Add(resource);
            }
        }
    }
}