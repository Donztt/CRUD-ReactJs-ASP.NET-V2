using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CRUD_Cadastro.DTO;
using CRUD_Cadastro.Settings;
using CRUD_Cadastro.Util;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace CRUD_Cadastro.Service
{
    public class LoginService
    {
        private readonly Contexto _context;

        public LoginService(Contexto context)
        {
            _context = context;
        }
        private readonly string chaveSecreta = "chaveUltraSecretaParaFinsDeEstudo";

        public async Task<LoginAuthDTO> AutenticarUsuario(LoginDTO loginDTO)
        {
            var login = await _context.Login.SingleOrDefaultAsync(l => l.LoginNome == loginDTO.Login);

            if (login == null)
            {
                return null;
            }

            if (Criptografia.VerificarSenha(login.Senha, loginDTO.Senha))
            {
                var token = CriarTokenJWT(loginDTO.Login);

                var loginAuth = new LoginAuthDTO() {
                    token = token,
                    UsuarioId = login.UsuarioId
                };

                return loginAuth;
            }
            return null;
        }

        private string CriarTokenJWT(string login)
        {
            var chaveSeguranca = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chaveSecreta));
            var credenciais = new SigningCredentials(chaveSeguranca, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, login),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                issuer: "sua_issuing_authority",
                audience: "sua_audience",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credenciais
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
