using Data.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Persistence
{
    public interface IDatabaseContext
    {
        DbSet<User> Users { get; set; }
        DbSet<Student> Students { get; set; }
        DbSet<Professor> Professors { get; set; }
        DbSet<Course> Courses { get; set; }
        DbSet<Week> Weeks { get; set; }
        DbSet<Resource> Resources { get; set; }
        DbSet<ProfessorCourse> ProfessorCourses { get; set; }
        DbSet<AppFile> Files { get; set; }
        DbSet<Post> Posts { get; set; }
        DbSet<StudentCourse> StudentCourses { get; set; }
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        int SaveChanges();
    }
}