using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace CreatingModels
{
    public class LessonCreatingModel
    {
        public string Title { get;  set; }
        public string Description { get; set; }
        public DateTime Date { get;  set; }
        public Guid WeekId { get;  set; }
        public List<IFormFile> files { get; set; }
        public string Type { get; set; }

    }
}