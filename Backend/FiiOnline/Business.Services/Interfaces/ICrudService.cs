using System.Collections.Generic;

namespace Business.Services.Interfaces
{
    public interface ICrudService<T, in TCreatingModel, TDTO, ID>
    {
        void Create(TCreatingModel entity);
        void Update(TCreatingModel entity, ID id);
        IEnumerable<T> GetAll();
        T GetById(ID id);
        void Delete(ID id);
    }
}