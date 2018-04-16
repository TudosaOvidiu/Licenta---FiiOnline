using System;
using CreatingModels;
using Data.Domain.Entities;

namespace Business.Repositories.Intefaces
{
    public interface IWeeksRepository: ICrudRepository<Week, Guid>
    {
        void Create(WeekCreatingModel entity);
        void Update(WeekCreatingModel entity, Guid id);
    }
}