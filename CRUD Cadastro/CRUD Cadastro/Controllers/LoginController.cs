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
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly Contexto _context;

        private LoginService _loginService;

        public LoginController(Contexto context)
        {
            _context = context;
            _loginService = new LoginService(_context);
        }

        [HttpGet]
        public string AutenticarUsuario([FromBody] LoginDTO loginDTO)
        {
            return _loginService.AutenticarUsuario(loginDTO);
        }
    }
}
