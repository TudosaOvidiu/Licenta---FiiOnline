using System;
using System.Collections.Generic;

namespace DTOs
{
    public class WeekDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public int WeekNr { get; set; }
        public string Description { get; set; }
        public List<ResourceDTO> ResourcesDtos{get; set; }
        public Guid CourseId { get; set; }

        public WeekDTO(Guid id, string title, DateTime date, int weekNr, string description, List<ResourceDTO> resourcesDtos, Guid courseId)
        {
            Id = id;
            Title = title;
            Date = date;
            WeekNr = weekNr;
            Description = description;
            ResourcesDtos = resourcesDtos;
            CourseId = courseId;
        }
    }
}