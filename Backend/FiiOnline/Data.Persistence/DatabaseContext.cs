using System;
using Data.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

namespace Data.Persistence
{
    public sealed class DatabaseContext : IdentityDbContext<User>, IDatabaseContext
    {
        public static readonly LoggerFactory MyLoggerFactory
            = new LoggerFactory(new[] {new ConsoleLoggerProvider((_, __) => true, true)});

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            Database.EnsureCreated();
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseLoggerFactory(MyLoggerFactory) // Warning: Do not create a new ILoggerFactory instance each time
                .EnableSensitiveDataLogging();

        public new DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Week> Weeks { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<ProfessorCourse> ProfessorCourses { get; set; }
        public DbSet<AppFile> Files { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Resource>()
                .HasOne(l => l.Week)
                .WithMany(w => w.Resources)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Week>()
                .HasOne(w => w.Course)
                .WithMany(c => c.Weeks)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AppFile>()
                .HasOne(f => f.Lesson)
                .WithMany(l => l.Files)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProfessorCourse>()
                .HasKey(uc => new {uc.ProfessorId, uc.CourseId});

            modelBuilder.Entity<ProfessorCourse>()
                .HasOne(uc => uc.Professor)
                .WithMany(p => p.UserCourses)
                .HasForeignKey(uc => uc.ProfessorId);

            modelBuilder.Entity<ProfessorCourse>()
                .HasOne(uc => uc.Course)
                .WithMany(c => c.UserCourses)
                .HasForeignKey(uc => uc.CourseId);
        }
    }
}