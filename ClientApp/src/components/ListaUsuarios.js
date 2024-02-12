import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "../CSS/ListaUsuarios.css";
import Fade from "react-reveal/Fade";
import axios from "axios";

const ListaUsuarios = () => {
  const [pessoas, setPessoas] = useState([]);

  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    getPessoas();
  }, []);

  const getPessoas = async () =>{
    await axios.get(baseUrl + "/api/Usuario")
    .then((response) => {
      setPessoas(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const HandleChangeUser = (id) => {
    window.location.href = "/AlteracaoDeDados/" + id;
  };

  return (
    <div>
      <Nav />
      <div className="container-md" id="UserList">
        <h3>Usuários cadastrados</h3>
        <div>
          <Fade top>
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
                <tbody>
                  {pessoas.map((Pessoa) => (
                    <tr
                      key={Pessoa.id}
                      onClick={(id) => HandleChangeUser(Pessoa.id)}
                    >
                      <td>{Pessoa.nome}</td>
                      <td>{Pessoa.cpf}</td>
                      <td>{Pessoa.cidade}</td>
                      <td>{Pessoa.estado}</td>
                      <td>{Pessoa.endereco}</td>
                      <td>{Pessoa.telefone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Fade>
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
