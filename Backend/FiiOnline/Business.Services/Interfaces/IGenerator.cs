using System;
using System.Threading.Tasks;
using Data.Domain.Entities;

namespace Business.Services.Interfaces
{
    public interface IGenerator
    {
        object GenerateJwtToken(string email, User user);
    }
}