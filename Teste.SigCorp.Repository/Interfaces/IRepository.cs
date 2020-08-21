using System.Collections.Generic;
using System.Threading.Tasks;
using Teste.SigCorp.Domain.Models;

namespace Teste.SigCorp.Repository.Interfaces
{
    public interface IRepository
    {
        Task<bool> SaveChangesAsync();
        Task<List<Evento>> GetAllEventosAsync();
        Task<Evento> GetEventoByIdAsync(int eventoId);
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
    }
}