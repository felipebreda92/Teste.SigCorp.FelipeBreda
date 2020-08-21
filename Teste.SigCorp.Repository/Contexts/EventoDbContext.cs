using Microsoft.EntityFrameworkCore;
using Teste.SigCorp.Domain.Models;

namespace Teste.SigCorp.Repository.Contexts
{
    public class EventoDbContext : DbContext
    {
        public EventoDbContext(DbContextOptions<EventoDbContext> options) : base(options) {}
        
        public DbSet<Evento> Eventos { get; set; }
    }
}