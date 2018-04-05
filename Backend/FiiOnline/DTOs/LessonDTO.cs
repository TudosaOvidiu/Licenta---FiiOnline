using System;
using System.Collections.Generic;

namespace DTOs
{
    public class LessonDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public Guid CourseId { get; set; }
        public List<string> FilesNames { get; set; }
        public List<string> FilesPaths { get; set; }

        public LessonDTO(string title, string description, DateTime date, Guid courseId, List<string> filesNames,
            List<string> filesPaths)
        {
            Title = title;
            Description = description;
            Date = date;
            CourseId = courseId;
            FilesNames = filesNames;
            FilesPaths = filesPaths;
        }
    }
}