using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Teste.SigCorp.Domain.Models;
using Teste.SigCorp.Repository.Contexts;
using Teste.SigCorp.Repository.Interfaces;

namespace Teste.SigCorp.Repository.Implementations
{
    public class EventoRepository : IRepository
    {
        private readonly EventoDbContext _context;
        public EventoRepository(EventoDbContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        
        public async Task<List<Evento>> GetAllEventosAsync() 
            => await _context.Eventos.ToListAsync();

        public async Task<Evento> GetEventoByIdAsync(int eventoId)
            => await _context.Eventos.FirstOrDefaultAsync(x => x.Id == eventoId);

        public void Add<T>(T entity) where T : class
            => _context.Add(entity);

        public void Update<T>(T entity) where T : class
            => _context.Update(entity);
        public void Delete<T>(T entity) where T : class
            => _context.Remove(entity);

        public async Task<bool> SaveChangesAsync()
            => (await _context.SaveChangesAsync()) > 0;
    }
}