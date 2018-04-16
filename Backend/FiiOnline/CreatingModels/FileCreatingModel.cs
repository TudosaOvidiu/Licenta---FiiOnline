using System;

namespace CreatingModels
{
    public class FileCreatingModel
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public Guid LessonId { get; set; }

        public FileCreatingModel(string fileName, string filePath, Guid lessonId)
        {
            FileName = fileName;
            FilePath = filePath;
            LessonId = lessonId;
        }
    }
}