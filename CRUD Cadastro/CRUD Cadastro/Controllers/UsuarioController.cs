using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD_Cadastro.Settings;
using CRUD_Cadastro.Model;
using CRUD_Cadastro.DTO;
using CRUD_Cadastro.Service;

namespace CRUD_Cadastro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly Contexto _context;

        private UsuarioService _usuarioService;

        public UsuarioController(Contexto context)
        {
            _context = context;
            _usuarioService = new UsuarioService(_context);
        }


        [HttpGet]
        public async Task<List<UsuarioDTO>> GetUsuarios()
        {
            return await _usuarioService.ObterTodosUsuarios();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetUsuarioById(int id)
        {
            var Pessoa = await _usuarioService.ObterUsuarioPorId(id);

            if (Pessoa == null)
            {
                return NotFound();
            }

            return Pessoa;
        }

        [HttpPut("{id}")]
        public async Task AtualizarUsuario(int id,[FromBody]UsuarioDTO usuarioDTO)
        {
           await _usuarioService.AtualizarUsuario(id ,usuarioDTO);
        }

        [HttpPost]
        public async Task<ActionResult<int>> AdicionarUsuario([FromBody] UsuarioDTO usuarioDTO)
        {
            return await _usuarioService.AdicionarUsuario(usuarioDTO);
        }

        [HttpDelete("{id}")]
        public async Task DeletarUsuario(int id)
        {
            await _usuarioService.ExcluirUsuario(id);
        }
    }
}
