using System;
using System.Collections.Generic;
using Business.Repositories.Intefaces;
using Business.Services.Interfaces;
using CreatingModels;
using Data.Domain.Entities;
using DTOs;

namespace Business.Services.Implementations
{
    public class WeeksService: IWeeksService
    {
        private readonly IWeeksRepository _weeksRepository;
        private readonly IResourcesService _resourcesService;

        public WeeksService(IWeeksRepository weeksRepository, IResourcesService resourcesService)
        {
            _weeksRepository = weeksRepository;
            _resourcesService = resourcesService;
        }

        public void Create(WeekCreatingModel entity)
        {
            _weeksRepository.Create(entity);
        }

        public void Update(WeekCreatingModel entity, Guid id)
        {
            _weeksRepository.Update(entity, id);
        }

        public IEnumerable<WeekDTO> GetAll()
        {
            List<WeekDTO> weekDtos = new List<WeekDTO>();
            var weeks = _weeksRepository.GetAll();
            foreach (var week in weeks)
            {
                weekDtos.Add(GetById(week.Id));
            }

            return weekDtos;
        }

        public WeekDTO GetById(Guid id)
        {
            var week = _weeksRepository.GetById(id);
            List<ResourceDTO> resourceDtos = new List<ResourceDTO>();
            ResourceDTO lecture = null;
            ResourceDTO seminar = null;
            ResourceDTO homework = null;
            foreach (var resource in week.Resources)
            {
                switch (resource.Type)
                {
                    case "Lecture":
                        lecture = _resourcesService.GetById(resource.Id);
                        break;
                    case "Seminar":
                        seminar = _resourcesService.GetById(resource.Id);
                        break;
                    case "Homework":
                        homework = _resourcesService.GetById(resource.Id);
                        break;
                }
            }

            resourceDtos.Add(lecture);
            resourceDtos.Add(seminar);
            resourceDtos.Add(homework);

            var courseName = _weeksRepository.GetCourseName(week.CourseId);
            return  new WeekDTO(week.Id, week.Title,week.Date, week.WeekNr, week.Description, resourceDtos, week.CourseId, courseName);
        }

        public void Delete(Guid id)
        {
            var week = _weeksRepository.GetById(id);
            foreach (var resource in week.Resources)
            {
                _resourcesService.Delete(resource.Id);
            }
            _weeksRepository.Delete(id);
        }
    }
}