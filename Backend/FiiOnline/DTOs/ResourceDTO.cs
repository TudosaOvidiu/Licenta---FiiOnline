using System;
using System.Collections.Generic;

namespace DTOs
{
    public class ResourceDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public Guid WeekId { get; set; }
        public List<FileDTO> FileDtos { get; set; }

        public ResourceDTO(Guid id, string title, string description, string type, Guid weekId, List<FileDTO> fileDtos)
        {
            Id = id;
            Title = title;
            Description = description;
            Type = type;
            WeekId = weekId;
            FileDtos = fileDtos;
        }
    }
}