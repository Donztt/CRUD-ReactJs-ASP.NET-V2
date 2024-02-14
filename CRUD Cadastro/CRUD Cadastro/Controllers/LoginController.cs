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
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CRUD_Cadastro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly Contexto _context;

        private LoginService _loginService;
        private UsuarioService _usuarioService;

        public LoginController(Contexto context)
        {
            _context = context;
            _loginService = new LoginService(_context);
            _usuarioService = new UsuarioService(_context);
        }

        [Authorize]
        [HttpGet("/Token")]
        public string ValidarToken()
        {
            var userId = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return userId;
        }

        [HttpPost("Auth")]
        public async Task<LoginAuthDTO> AutenticarUsuario([FromBody] LoginDTO loginDTO)
        {
            return await _loginService.AutenticarUsuario(loginDTO);
        }
    }
}
