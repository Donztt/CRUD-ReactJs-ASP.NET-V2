import React, { useState, useEffect } from "react";
import "../CSS/cadastro.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import axios from "axios";
import Erro from "./MensagemSistema";
import InputMask from "react-input-mask";

const Cadastro = () => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
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

  const Cadastrar = async () => {
    if (
      nome === "" ||
      cpf === "" ||
      login === "" ||
      senha === "" ||
      cep === ""
    ) {
      setMensagemSistema({
        mensagemTexto: "Campo(s) obrigatório(s) não preenchidos! (*)",
        exibirMensagem: true,
        temErro: true,
      });
      return;
    }

    const credentials = {
      login: login,
      senha: senha,
      nome: nome,
      cpf: cpf,
      cep: cep,
      cidade: cidade,
      estado: estado,
      endereco: endereco,
      telefone: telefone,
    };
    await axios.post(baseUrl + "/api/Usuario/", credentials).then((data) => {
      setMensagemSistema({
        mensagemTexto: "Usuário criado com sucesso!",
        exibirMensagem: true,
        temErro: false,
      });
      window.location.href = "/";
    });
  };

  const buscarCep = async (cep) => {
    if (cep.length !== 8) {
      return null;
    }
    await axios
      .get("http://viacep.com.br/ws/" + cep + "/json/")
      .then((cep) => {
        setEndereco(cep.data.logradouro);
        setCidade(cep.data.localidade);
        setEstado(cep.data.uf);
        return cep.data;
      })
      .catch((err) => {
        return null;
      });
  };

  useEffect(() => {
    buscarCep(cep);
  }, [cep]);

  return (
    <div>
      <Nav />
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
              alt=""
            />
            <h3>Já possui conta?</h3>
            <p>Faça seu login agora!</p>
            <Link to="/Login">
              <input type="submit" name="" value="Login" />
              <br />
            </Link>
          </div>
          <div className="col-md-9 register-right">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="register-heading">Faça seu cadastro</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="nome"
                        placeholder="Nome *"
                        defaultValue={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <InputMask
                        className="form-control"
                        mask="999.999.999-99"
                        maskChar={null}
                        placeholder="CPF *"
                        value={cpf}
                        onChange={(e) =>
                          setCpf(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="loginNome"
                        placeholder="Usuario *"
                        defaultValue={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="senha"
                        placeholder="Senha *"
                        defaultValue={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <InputMask
                        className="form-control"
                        mask="99999-999"
                        maskChar={null}
                        placeholder="CEP *"
                        value={cep}
                        onChange={(e) =>
                          setCep(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="cidade"
                        placeholder="Cidade"
                        defaultValue={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="estado"
                        placeholder="Estado"
                        defaultValue={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="endereco"
                        placeholder="Endereco"
                        defaultValue={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
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
                  </div>
                  <input
                    type="button"
                    className="btnRegister w-100"
                    onClick={Cadastrar}
                    value="Cadastrar"
                  />
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

export default Cadastro;
