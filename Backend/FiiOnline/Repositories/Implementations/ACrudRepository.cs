using System;
using System.Collections.Generic;
using System.Linq;
using Business.Repositories.Intefaces;
using Data.Persistence;

namespace Business.Repositories.Implementations
{
    public abstract class ACrudRepository<T, ID> : ICrudRepository<T, ID> where T: class 
    {
        protected readonly IDatabaseContext _databaseContext;

        public ACrudRepository(IDatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public virtual void Create(T entity)
        {
            try
            {
                _databaseContext.Set<T>().Add(entity);
                _databaseContext.SaveChanges();
            }
            catch (Exception e)
            {

            }
    }

        public virtual IReadOnlyList<T> GetAll()
        {
            return  _databaseContext.Set<T>().ToList();
        }

        public virtual T GetById(ID id)
        {
            return _databaseContext.Set<T>().Find(id);
        }

        public virtual void Update(T entity)
        {
            if (entity == null)
            {
                return;
            }

            _databaseContext.Set<T>().Update(entity);
            _databaseContext.SaveChanges();
        }

        public virtual void Delete(ID id)
        {
            var entity = this.GetById(id);
            _databaseContext.Set<T>().Remove(entity);
            _databaseContext.SaveChanges();
        }
    }
}