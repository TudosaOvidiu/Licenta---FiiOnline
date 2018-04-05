using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace CreatingModels
{
    public class TrialModel
    {
        public string Title { get; set; }
        public List<IFormFile> files { get; set; }
    }   
}