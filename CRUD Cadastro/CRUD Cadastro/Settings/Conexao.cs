using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Threading;


    class Conexao
    {
        private String Usuario, Senha, catalogo, server;
        private String banco;
        private SqlConnection sqlcon;
        public DataTable data;

        public Conexao()
        {
            Usuario = "usuario";
            Senha = "1234";
            catalogo = "CADASTRO";
            server = "DONZTT";

            /*banco =  "Server=" + server + ";";
            banco += "Database=" + catalogo + ";";
            banco += "User Id=" + Usuario + ";";
            banco += "Password=" + Senha + ";";

            if (Usuario == "")
            {
                banco = banco + "Trusted_Connection=True;";
            }*/

            banco = "Data Source =" + server + ";";
            banco += "User ID =" + Usuario + ";";
            banco += "Password =" + Senha + ";";
            banco += " Initial Catalog =" + catalogo + ";";

            if (Usuario == "")
            {
                banco += " Integrated Security = true;";
            }
           //MessageBox.Show("USUARIO:" + Usuario +"\nSENHA:"+Senha +"\nCATALOGO:"+ catalogo + "\nBANCO DE DADOS:"+ server);

            //MessageBox.Show(banco);
            sqlcon = new SqlConnection(banco);
            data = new DataTable();
        }

        public void Select2(String Comando)
        {
            SqlDataAdapter sqladap;

            try
            {
                sqladap = new SqlDataAdapter(Comando, sqlcon);
                sqladap.Fill(this.data);
            }
            catch (Exception) { }
        }

        private bool OpenConnection()
        {
            try
            {
                sqlcon.Open();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private bool CloseConnection()
        {
            try
            {
                sqlcon.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public int Count(string query)
        {
            int Count = -1;

            if (this.OpenConnection() == true)
            {
                SqlCommand cmd = new SqlCommand(query, sqlcon);
                Count = int.Parse(cmd.ExecuteScalar() + "");
                this.CloseConnection();
                return Count;
            }
            else
            {
                return Count;
            }
        }

    }
