using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Teste.SigCorp.Repository.Contexts;

namespace Teste.SigCorp.Api.Configurations
{
    public static class ApiConfig
    {
        public static IServiceCollection WebApiConfig(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EventoDbContext> (options => {
                options.UseSqlServer (configuration.GetConnectionString ("DefaultConnection"));
            });

            services.AddCors(options =>
            {
                options.AddPolicy(name: "MyAllowSpecificOrigins",
                              builder =>
                              {
                                  builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                              });
            });
            
            return services;
        }
    }
}