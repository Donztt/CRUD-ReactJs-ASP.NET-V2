using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CRUD_Cadastro.DTO;
using CRUD_Cadastro.Settings;
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
        // Substitua 'sua_chave_secreta_super_secreta' por uma chave secreta real e segura em um ambiente de produção.

        public string AutenticarUsuario(LoginDTO loginDTO)
        {
            // Aqui você faria a lógica real de autenticação, verificando as credenciais do usuário em um banco de dados, por exemplo.
            // Neste exemplo, apenas usaremos credenciais fixas para ilustrar o processo.

            if (loginDTO.Login == "usuario_demo" && loginDTO.Senha == "senha_demo")
            {
                // Usuário autenticado com sucesso

                // Criar token JWT
                var token = CriarTokenJWT(loginDTO.Login);

                return token;
            }

            // Usuário não autenticado
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
