import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import "../CSS/Login.css";
import Zoom from "react-reveal/Zoom";
import axios from "axios";
import Erro from "./MensagemSistema";

const Login = () => {

  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [lembreDeMim, setLembreDeMim] = useState(false);

  const [mensagemSistema, setMensagemSistema] = useState({
    mensagemTexto: "",
    exibirMensagem: false,
    temErro: false,
  });

  useEffect(() =>{
    const loginSalvo = localStorage.getItem('login');
    const senhaSalva = localStorage.getItem('senha');
    const lembreDeMimSalvo = localStorage.getItem('lembreDeMim');

    if(loginSalvo){
        setLogin(loginSalvo);
    }
    if(senhaSalva){
        setSenha(senhaSalva);
    }
    if(lembreDeMimSalvo){
        setLembreDeMim(lembreDeMimSalvo);
    }
  },[])

  const lembreDeMimLocalStorage = () => {
    if(lembreDeMim){
        localStorage.setItem('login', login);
        localStorage.setItem('senha', senha);
        localStorage.setItem('lembreDeMim', lembreDeMim);
    }
    else{
        localStorage.removeItem('login');
        localStorage.removeItem('senha');
        localStorage.removeItem('lembreDeMim');
    }
  }

  const Logar = async () => {
    lembreDeMimLocalStorage();

    const loginCredentials = {
      login: login,
      senha: senha,
    };

    await axios.post(baseUrl + "/api/Login/Auth/", loginCredentials).then((loginRequest) => {
      if (loginRequest.data === null) {
        setMensagemSistema({
          mensagemTexto: "Usuário ou senha inválido(s)",
          exibirMensagem: true,
          temErro: true,
        });
        setLogin("");
        setSenha("");
      } else {
        setMensagemSistema({
          mensagemTexto: "Usuário logado com sucesso!",
          exibirMensagem: true,
          temErro: false,
        });
        localStorage.setItem('token', loginRequest.data.token);
        window.location.href = "/dadosUsuario/" + loginRequest.data.usuarioId;
      }
    }).catch((err) => {
        setMensagemSistema({
            mensagemTexto: "Ocorreu um erro: " + err,
            exibirMensagem: true,
            temErro: true,
          });
    });
  };

  return (
    <div>
      <Nav />
      <Zoom>
        <div id="login">
          <div className="container">
            <div
              id="login-row"
              className="row justify-content-center align-items-center"
            >
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <h3 className="text-center text-info">Login</h3>
                  <div className="form-group">
                    <label className="text-info">Usuario:</label>
                    <br />
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      defaultValue={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-info">Senha:</label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      defaultValue={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-info">
                      <span>
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          checked={lembreDeMim}
                          onChange={(e) => setLembreDeMim(e.target.value)}
                        />
                      </span>
                      <span>Lembre de mim</span> 
                    </label>
                    <br />
                    <input
                      type="button"
                      className="btn btn-info btn-md"
                      id="LoginButton"
                      value="Entrar"
                      onClick={Logar}
                    />
                  </div>
                  <div id="register-link" className="text-right">
                    <Link to="/Cadastro" className="text-info">
                      Cadastrar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Zoom>
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

export default Login;
