import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "../CSS/ListaUsuarios.css";
import { Fade } from "react-reveal";
import axios from "axios";
import {formatarCpf, formatarTelefone} from "./Utilitario"

const ListaUsuarios = () => {
  const [pessoas, setPessoas] = useState([]);

  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    getPessoas();
  }, []);

  const getPessoas = async () => {
    await axios
      .get(baseUrl + "/api/Usuario")
      .then((response) => {
        setPessoas(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleChangeUser = (id) => {
    window.location.href = "/AlteracaoDeDados/" + id;
  };

  return (
    <div>
      <Nav />
      <div className="container-md text-center" id="UserList">
        <h3>Usuários cadastrados</h3>
        <div>
          <div id="tableItens">
            <table className="table" aria-labelledby="tabelLabel">
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>CPF</th>
                  <th>CIDADE</th>
                  <th>ESTADO</th>
                  <th>ENDERECO</th>
                  <th>TELEFONE</th>
                </tr>
              </thead>
              <Fade left cascade>
                <tbody>
                  {pessoas.map((Pessoa) => (
                    <tr
                      id="userItem"
                      key={Pessoa.id}
                      onClick={(id) => HandleChangeUser(Pessoa.id)}
                    >
                      <td>{Pessoa.nome}</td>
                      <td>{formatarCpf(Pessoa.cpf)}</td>
                      <td>{Pessoa.cidade}</td>
                      <td>{Pessoa.estado}</td>
                      <td>{Pessoa.endereco}</td>
                      <td>{formatarTelefone(Pessoa.telefone)}</td>
                    </tr>
                  ))}
                </tbody>
              </Fade>
            </table>
          </div>
        </div>
        <p>
          *Clique sobre o item que deseja alterar ou excluir da lista de
          usuários!
        </p>
      </div>
    </div>
  );
};

export default ListaUsuarios;
