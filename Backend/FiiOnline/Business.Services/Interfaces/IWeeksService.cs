using System;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

namespace Business.Services.Interfaces
{
    public interface IWeeksService: ICrudService<Week, WeekCreatingModel, WeekDTO, Guid>
    {
        
    }
}