using CRUD_Cadastro.DTO;
using CRUD_Cadastro.Model;
using CRUD_Cadastro.Settings;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD_Cadastro.Service
{
    public class UsuarioService
    {
        private readonly Contexto _context;

        public UsuarioService(Contexto context)
        {
            _context = context;
        }

        public async Task<List<UsuarioDTO>> ObterTodosUsuarios()
        {
            var usuarios = await _context.Usuarios.ToListAsync();
            return usuarios.Select(usuario => ConverterParaDTO(usuario)).ToList();
        }

        public async Task<UsuarioDTO> ObterUsuarioPorId(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            return usuario != null ? ConverterParaDTO(usuario) : null;
        }

        public async Task<int> AdicionarUsuario(UsuarioDTO usuarioDTO)
        {
            var usuario = ConverterParaEntidade(usuarioDTO);
            var usuarioNovo = _context.Usuarios.Add(usuario);

            var loginCriado = new Login()
            {
                LoginNome = usuarioDTO.Login,
                Senha = usuarioDTO.Senha,
                Usuario_id = usuarioNovo.Entity.Id
            };

            _context.Login.Add(loginCriado);

            await _context.SaveChangesAsync();
            return usuario.Id;
        }

        public async Task AtualizarUsuario(int id, UsuarioDTO usuarioDTO)
        {
            var usuario = ConverterParaEntidade(usuarioDTO);
            usuario.Id = id;
            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task ExcluirUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
            }
        }

        private UsuarioDTO ConverterParaDTO(Usuario usuario)
        {
            return new UsuarioDTO
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                CPF = usuario.CPF,
                CEP = usuario.CEP,
                Cidade = usuario.Cidade,
                Estado = usuario.Estado,
                Endereco = usuario.Endereco,
                Telefone = usuario.Telefone
            };
        }
        private Usuario ConverterParaEntidade(UsuarioDTO usuarioDTO)
        {
            return new Usuario
            {
                Id = usuarioDTO.Id,
                Nome = usuarioDTO.Nome,
                CPF = usuarioDTO.CPF,
                CEP = usuarioDTO.CEP,
                Cidade = usuarioDTO.Cidade,
                Estado = usuarioDTO.Estado,
                Endereco = usuarioDTO.Endereco,
                Telefone = usuarioDTO.Telefone
            };
        }
    }
}
