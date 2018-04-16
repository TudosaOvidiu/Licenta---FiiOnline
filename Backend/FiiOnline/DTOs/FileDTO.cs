using System;
using System.Globalization;

namespace DTOs
{
    public class FileDTO
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }

        public FileDTO(Guid id, string fileName, string filePath)
        {
            this.Id = id;
            this.FileName = fileName;
            this.FilePath = filePath;
        }
    }
}