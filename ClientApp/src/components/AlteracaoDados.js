import React, { useState, useEffect } from "react";
import "../CSS/AlteracaoDados.css";
import Nav from "./Nav";
import axios from "axios";
import Erro from "./MensagemSistema";
import { Fade, Zoom } from "react-reveal";
import { useParams } from "react-router-dom";
import InputMask from "react-input-mask";

const AlteracaoDados = () => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  const [mensagemSistema, setMensagemSistema] = useState({
    mensagemTexto: "",
    exibirMensagem: false,
    temErro: false,
  });

  useEffect(() => {
    CarregarUsuario();
  }, []);

  const CarregarUsuario = async () => {
    await axios.get(baseUrl + "/api/Usuario/" + id).then((user) => {
      setCep(user.data.cep);
      setCidade(user.data.cidade);
      setCpf(user.data.cpf);
      setEndereco(user.data.endereco);
      setEstado(user.data.estado);
      setNome(user.data.nome);
      setTelefone(user.data.telefone);

      setMensagemSistema({
        mensagemTexto: "Usuário carregado com sucesso",
        exibirMensagem: true,
        temErro: false,
      });
    });
  };

  const handleEdit = async () => {
    if (!window.confirm("Você deseja realmente alterar os dados?")) {
      return;
    }

    const credentials = {
      id: id,
      nome: nome,
      cpf: cpf,
      cep: cep,
      cidade: cidade,
      estado: estado,
      endereco: endereco,
      telefone: telefone,
    };

    axios.put(baseUrl + "/api/Usuario/", credentials).then(() => {
      setMensagemSistema({
        mensagemTexto: "Usuário alterado com sucesso!",
        exibirMensagem: true,
        temErro: false,
      });
      window.location.href = "/";
    }).catch((err)=>{
      setMensagemSistema({
        mensagemTexto: "Ocorreu um erro ao alterar o usuário: " + err,
        exibirMensagem: true,
        temErro: true,
      });
    });
  };

  const HandleDeleteItem = async () => {
    if (!window.confirm("Você deseja realmente deletar este usuário?")) {
      return;
    }
    await axios.delete(baseUrl + "/api/Usuario/" + id).then(() => {
      setMensagemSistema({
        mensagemTexto: "Usuário deletado com sucesso!",
        exibirMensagem: true,
        temErro: false,
      });
      window.location.href = "/";
    }).catch((err)=>{
      setMensagemSistema({
        mensagemTexto: "Ocorreu um erro ao deletar o usuário: " + err,
        exibirMensagem: true,
        temErro: true,
      });
    });
  };

  return (
    <div>
      <div>
        <Nav />
        <div className="container-md">
          <div>
            <div id="textFields">
              <h3 className="text-center">Dados do Usuário</h3>
              <div className="row align-items-center">
                <div className="col">
                  <input
                    className="form-control"
                    id="NomeCampo"
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    defaultValue={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                  <InputMask
                    className="form-control"
                    mask="999.999.999-99"
                    maskChar={null}
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                  <InputMask
                    className="form-control"
                    mask="(99) 99999-9999"
                    maskChar={null}
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) =>
                      setTelefone(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
                <div className="col">
                  <InputMask
                    className="form-control"
                    mask="99999-999"
                    maskChar={null}
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                  <input
                    className="form-control"
                    id="enderecoCampo"
                    type="text"
                    name="endereco"
                    placeholder="Endereco"
                    defaultValue={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
                  <input
                    className="form-control"
                    id="CidadeCampo"
                    type="text"
                    name="cidade"
                    placeholder="Cidade"
                    defaultValue={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                  <input
                    className="form-control"
                    id="EstadoCampo"
                    type="text"
                    name="estado"
                    placeholder="Estado"
                    defaultValue={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <Zoom>
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={handleEdit}
                    >
                      Alterar Usuário
                    </button>
                  </Zoom>
                </div>
                <div className="col">
                  <Zoom>
                    <button
                      type="button"
                      className="btn btn-danger w-100"
                      onClick={HandleDeleteItem}
                    >
                      Deletar Usuário
                    </button>
                  </Zoom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Erro
        mensagem={mensagemSistema.mensagemTexto}
        onClose={() =>
          setMensagemSistema({ ...mensagemSistema, exibirMensagem: false })
        }
        onExibirChange={mensagemSistema.exibirMensagem}
        temErro={mensagemSistema.temErro}
      />
    </div>
  );
};

export default AlteracaoDados;
