using System.Collections.Generic;

namespace Business.Repositories.Intefaces
{
    public interface ICrudRepository<T, ID>
    {
        void Create(T entity);

        IReadOnlyList<T> GetAll();

        T GetById(ID id);

        void Update(T entity);

        void Delete(ID id);
    }
}