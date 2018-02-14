using Data.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Persistence
{
    public interface IDatabaseContext
    {
        DbSet<User> Users { get; set; }
        DbSet<Course> Courses { get; set; }
        DbSet<Lesson> Lessons { get; set; }
        DbSet<UserCourse> UserCourses { get; set; }
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        int SaveChanges();
    }
}