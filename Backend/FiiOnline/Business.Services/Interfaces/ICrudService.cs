using System.Collections.Generic;
using System.Threading.Tasks;
using DTOs;

namespace Business.Services.Interfaces
{
    public interface ICrudService<T, in TCreatingModel, TDTO, ID>
    {
        void Create(TCreatingModel entity);
        void Update(TCreatingModel entity, ID id);
        IEnumerable<T> GetAll();
        TDTO GetById(ID id);
        void Delete(ID id);
    }
}