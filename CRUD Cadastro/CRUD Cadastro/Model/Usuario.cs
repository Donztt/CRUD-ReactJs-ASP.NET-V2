using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD_Cadastro.Model
{
    [Table("USUARIO")]
    public class Usuario
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("NOME")]
        public string Nome { get; set; }
        [Column("CEP")]
        public string CEP { get; set; }
        [Column("CPF")]
        public string CPF { get; set; }
        [Column("CIDADE")]
        public string Cidade { get; set; }
        [Column("ESTADO")]
        public string Estado { get; set; }
        [Column("ENDERECO")]
        public string Endereco { get; set; }
        [Column("TELEFONE")]
        public string Telefone { get; set; }
    }
}
