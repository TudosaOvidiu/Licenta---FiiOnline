using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Business.Repositories.Intefaces;
using CreatingModels;
using Data.Domain.Entities;
using Data.Persistence;
using Microsoft.Data.OData.Query.SemanticAst;
using Microsoft.EntityFrameworkCore;

namespace Business.Repositories.Implementations
{
    public class LessonsRepository: ACrudRepository<Lesson, Guid>, ILessonsRepository
    {
        public LessonsRepository(IDatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public async Task Create(LessonCreatingModel model)
        {
            var absolutePath = "C:\\Users\\Ovidiu\\Documents\\GitHub\\Licenta---FiiOnline\\Files";
            var filePath = "";
            List<AppFile> files = new List<AppFile>();
            foreach (var formFile in model.files)
            {
                if (formFile.Length > 0)
                {
                    var fileName = formFile.FileName;
                    var fileGuid = Guid.NewGuid();
                    filePath = Path.Combine(absolutePath, fileName);
                    fileName = String.Format("{0}{1}{2}", Path.GetFileNameWithoutExtension(filePath), fileGuid, Path.GetExtension(filePath));
                    filePath = Path.Combine(absolutePath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                    files.Add(AppFile.Create(fileGuid, formFile.FileName, filePath));

                }
            }

            var course = _databaseContext.Courses.FirstOrDefault(c => c.Id.Equals(model.CourseId));
            var lesson = Lesson.Create(model.Title, model.Description, model.Date, model.CourseId, course);
            foreach (var file in files)
            {
                file.Update(lesson.Id, lesson);
            }

            lesson.AddFiles(files);
            course.AddLesson(lesson);

            _databaseContext.Courses.Update(course);
            _databaseContext.SaveChanges();
        }

        public override IReadOnlyList<Lesson> GetAll() => _databaseContext.Lessons.Include(l => l.Course).Include(l => l.Files).ToList();

        public override Lesson GetById(Guid id) => _databaseContext.Lessons.Include(l => l.Course).Include(l => l.Files).FirstOrDefault(l => l.Id.Equals(id));

        public void DeleteFile(FileCreatingModel file)
        {
            var lesson = _databaseContext.Lessons.FirstOrDefault(l => l.Id.Equals(file.LessonId));
            if (File.Exists(file.FilePath))
            {
                File.Delete(file.FilePath);
            }

            var existing_file = _databaseContext.Files.FirstOrDefault(f => f.Path.Equals(file.FilePath));
            lesson.RemoveFile(existing_file);

            _databaseContext.SaveChanges();
        }

        public async Task Update(LessonCreatingModel model, Guid id)
        {
            var lesson = _databaseContext.Lessons.FirstOrDefault(l => l.Id.Equals(id));
            lesson.Update(model.Title, model.Description, model.Date);

            var absolutePath = "C:\\Users\\Ovidiu\\Documents\\GitHub\\Licenta---FiiOnline\\Files";
            var filePath = "";
            List<AppFile> files = new List<AppFile>();
            foreach (var formFile in model.files)
            {
                if (formFile.Length > 0)
                {
                    var fileName = formFile.FileName;
                    var fileGuid = Guid.NewGuid();
                    filePath = Path.Combine(absolutePath, fileName);
                    fileName = String.Format("{0}{1}{2}", Path.GetFileNameWithoutExtension(filePath), fileGuid, Path.GetExtension(filePath));
                    filePath = Path.Combine(absolutePath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                    files.Add(AppFile.Create(fileGuid, formFile.FileName, filePath));

                }
            }
            lesson.AddFiles(files);

            _databaseContext.SaveChanges();
        }
    }
}