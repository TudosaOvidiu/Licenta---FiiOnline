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
    public class ResourcesRepository: ACrudRepository<Resource, Guid>, IResourcesRepository
    {
        public ResourcesRepository(IDatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public async Task Create(LessonCreatingModel model)
        {
            var absolutePath = "C:\\Users\\Ovidiu\\Documents\\GitHub\\Licenta---FiiOnline\\Files";
            var filePath = "";
            List<AppFile> files = new List<AppFile>();
            try
            {
                foreach (var formFile in model.files)
                {
                    if (formFile.Length > 0)
                    {
                        var fileName = formFile.FileName;
                        var fileGuid = Guid.NewGuid();
                        filePath = Path.Combine(absolutePath, fileName);
                        fileName = String.Format("{0}{1}{2}", Path.GetFileNameWithoutExtension(filePath), fileGuid,
                            Path.GetExtension(filePath));
                        filePath = Path.Combine(absolutePath, fileName);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }

                        files.Add(AppFile.Create(fileGuid, formFile.FileName, filePath));

                    }
                }
            }
            catch (Exception e)
            {
            }

            var week = _databaseContext.Weeks.FirstOrDefault(w => w.Id.Equals(model.WeekId));
            var resource = Resource.Create(model.Title, model.Description, model.Type, model.WeekId, week);
            foreach (var file in files)
            {
                file.Update(resource.Id, resource);
            }

            resource.AddFiles(files);
            week.AddResource(resource);

            _databaseContext.Weeks.Update(week);
            _databaseContext.SaveChanges();
        }

        public override IReadOnlyList<Resource> GetAll() => _databaseContext.Resources.Include(l => l.Week).Include(l => l.Files).ToList();

        public override Resource GetById(Guid id) => _databaseContext.Resources.Include(l => l.Week).Include(l => l.Files).FirstOrDefault(l => l.Id.Equals(id));

        public void DeleteFile(FileCreatingModel file)
        {
            var lesson = _databaseContext.Resources.FirstOrDefault(l => l.Id.Equals(file.LessonId));
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
            var lesson = _databaseContext.Resources.FirstOrDefault(l => l.Id.Equals(id));
            lesson.Update(model.Title, model.Description, model.Type);

            var absolutePath = "C:\\Users\\Ovidiu\\Documents\\GitHub\\Licenta---FiiOnline\\Files";
            var filePath = "";
            List<AppFile> files = new List<AppFile>();
            if (model.files != null)
            {
                foreach (var formFile in model.files)
                {
                    if (formFile.Length > 0)
                    {
                        var fileName = formFile.FileName;
                        var fileGuid = Guid.NewGuid();
                        filePath = Path.Combine(absolutePath, fileName);
                        fileName = String.Format("{0}{1}{2}", Path.GetFileNameWithoutExtension(filePath), fileGuid,
                            Path.GetExtension(filePath));
                        filePath = Path.Combine(absolutePath, fileName);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }

                        files.Add(AppFile.Create(fileGuid, formFile.FileName, filePath));

                    }
                }

                lesson.AddFiles(files);
            }

            _databaseContext.SaveChanges();
        }

        public AppFile GetFileById(Guid id) => _databaseContext.Files.FirstOrDefault(f => f.Id.Equals(id));
    }
}