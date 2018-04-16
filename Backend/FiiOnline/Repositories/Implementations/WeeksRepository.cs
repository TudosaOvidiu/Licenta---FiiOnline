using System;
using System.Linq;
using Business.Repositories.Intefaces;
using CreatingModels;
using Data.Domain.Entities;
using Data.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Business.Repositories.Implementations
{
    public class WeeksRepository: ACrudRepository<Week, Guid>, IWeeksRepository
    {
        public WeeksRepository(IDatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public void Create(WeekCreatingModel entity)
        {
            var course = _databaseContext.Courses.FirstOrDefault(c => c.Id.Equals(entity.courseId));
            var week = Week.Create(entity.Title, entity.Date, entity.WeekNr, entity.Description, entity.courseId,
                course);
            course.AddWeek(week);

            _databaseContext.Courses.Update(course);
            _databaseContext.SaveChanges();
        }

        public override Week GetById(Guid Id) => _databaseContext.Weeks.Include(w => w.Resources).FirstOrDefault(w => w.Id.Equals(Id));

        public void Update(WeekCreatingModel entity, Guid id)
        {
            var week =_databaseContext.Weeks.FirstOrDefault(w => w.Id.Equals(id));
            week.Update(entity.Title, entity.Date, entity.WeekNr, entity.Description);

            _databaseContext.Weeks.Update(week);
            _databaseContext.SaveChanges();
        }

    }
}