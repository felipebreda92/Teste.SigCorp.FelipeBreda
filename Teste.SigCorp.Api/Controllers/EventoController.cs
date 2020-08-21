using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Teste.SigCorp.Domain.Models;
using Teste.SigCorp.Repository.Interfaces;

namespace Teste.SigCorp.Api.Controllers
{
    [EnableCors("MyAllowSpecificOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IRepository _repository;

        public EventoController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("obter-eventos")]
        public async Task<IActionResult> GetAllEventosAsync()
        {
            try
            {
                var eventos = await _repository.GetAllEventosAsync();

                if(eventos == null)  return NoContent();

                return Ok(eventos);
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("obter-por-id/{id}")]
        public async Task<IActionResult> GetAllEventosByIdAsync([FromQuery]int id)
        {
            try
            {
                var evento = await _repository.GetEventoByIdAsync(id);

                if(evento == null) return NotFound();

                return Ok(evento);
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        [Route("adicionar")]
        public async Task<IActionResult> AdicionarEvento([FromBody] Evento evento)
        {
            try
            {
                _repository.Add(evento);

                var saveChanges = await _repository.SaveChangesAsync();

                if(!saveChanges) return BadRequest();

                return Created($"/api/evento/{evento.Id}", evento);
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }   
        }

        [HttpPut]
        [Route("atualizar/{id}")]
        public async Task<IActionResult> AtualizarEvento(int id, [FromBody] Evento evento)
        {
            try
            {
                var result = await _repository.GetEventoByIdAsync(id);

                if(result == null) return NotFound();

                _repository.Update(evento);

                var saveChanges = await _repository.SaveChangesAsync();

                if(!saveChanges) return BadRequest();

                return Created($"/api/evento/{evento.Id}", evento);
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }   
            
        }

        [HttpDelete]
        [Route("deletar/{id}")]
        public async Task<IActionResult> DeletarEvento(int id)
        {
            try 
            {
                 var result = await _repository.GetEventoByIdAsync(id);

                if(result == null) return NotFound();
        
                _repository.Delete(result);

                var saveChanges = await _repository.SaveChangesAsync();

                if(!saveChanges) return BadRequest();
            
                return Ok();
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }   
        }
    }
}