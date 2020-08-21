using Microsoft.Extensions.DependencyInjection;
using Teste.SigCorp.Repository.Implementations;
using Teste.SigCorp.Repository.Interfaces;

namespace Teste.SigCorp.Api.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<IRepository, EventoRepository>();

            return services;
        }
    }
}