import React, { useEffect, useState } from "react";
import "../CSS/dadosUsuario.css";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import axios from "axios";
import {formatarCpf, formatarTelefone, formatarCep} from "./Utilitario"

const DadosUsuario = () => {
  const { id } = useParams();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const [usuario, setUsuario] = useState({});
  const [mensagemSistema, setMensagemSistema] = useState({
    mensagemTexto: "",
    exibirMensagem: false,
    temErro: false,
  });

  useEffect(() => {
    ChargePeople();
  }, []);

  const ChargePeople = async () => {
    await axios.get(baseUrl + "/api/Usuario/" + id).then((user) => {
      setUsuario(user.data);
    });
  };

  return (
    <div>
      <Nav />
      <div className="container emp-profile">
        <div className="profile-head">
          <h5 className="text-center">{usuario.nome}</h5>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="/"
                id="home-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Dados
              </a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>CPF</label>
                  </div>
                  <div className="col-md-6">
                    <p>{formatarCpf(usuario.cpf)}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Telefone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{formatarTelefone(usuario.telefone)}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Cidade</label>
                  </div>
                  <div className="col-md-6">
                    <p>{usuario.cidade}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Estado</label>
                  </div>
                  <div className="col-md-6">
                    <p>{usuario.estado}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Endereço</label>
                  </div>
                  <div className="col-md-6">
                    <p>{usuario.endereco}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>CEP</label>
                  </div>
                  <div className="col-md-6">
                    <p>{formatarCep(usuario.cep)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DadosUsuario;
