using System;

namespace CreatingModels
{
    public class WeekCreatingModel
    {
        public string Title { get;  set; }
        public DateTime Date { get;  set; }
        public int WeekNr { get;  set; }
        public string Description { get;  set; }
        public Guid courseId { get; set; }
    }
}