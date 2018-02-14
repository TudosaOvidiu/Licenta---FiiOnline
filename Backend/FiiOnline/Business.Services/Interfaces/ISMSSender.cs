using System.Threading.Tasks;

namespace Business.Services.Interfaces
{
    public interface ISMSSender
    {
        Task SendSmsAsync(string number, string message);
    }
}