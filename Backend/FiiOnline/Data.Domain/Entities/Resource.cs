using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using CreatingModels;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Data.Domain.Entities
{
    public class Resource
    {
        private Resource() { }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public string Type { get; private set; }

        [ForeignKey("Weeks")]
        public Guid WeekId { get; private set; }
        public Week Week { get; private set; }

        public ICollection<AppFile> Files { get; private set; }

        public static Resource Create(string name, string description, string type, Guid weekId, Week week)
        {
            var instance = new Resource { Id = Guid.NewGuid() };
            instance.Update(name, description, type, weekId, week);
            return instance;
        }

        public void Update(string name, string description, string type)
        {
            Name = name;
            Description = description;
            Type = type;
        }

        public void Update(string name, string description, string type, Guid weekId, Week week)
        {
            Name = name;
            Description = description;
            WeekId = weekId;
            Week = week;
            Type = type;
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