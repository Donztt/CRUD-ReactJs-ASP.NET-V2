import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Nav from './Nav'
import '../CSS/Login.css';
import Zoom from 'react-reveal/Zoom';

class Login extends Component {
    constructor() {
        super();
        this.intialize();
        this.HandleLogin = this.HandleLogin.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async intialize() {

        this.state = { login: '' };
        this.state = { password: '' };
    }

    handleLoginChange(e) {
        this.setState({ login: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    async HandleLogin(event) {
        event.preventDefault();

        const response = await fetch('api/Login/Login/' + this.state.login + ',' + this.state.password);
        const data = await response.json();

        if (data.title === "Bad Request") {
            alert("senha ou usuário incorreto");
        }
        else
        {
            this.props.history.push('/dadosUsuario/' + data.pessoa_id);
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <Zoom>
                    <div id="login">
                        <div className="container">
                            <div id="login-row" className="row justify-content-center align-items-center">
                                <div id="login-column" className="col-md-6">
                                    <div id="login-box" className="col-md-12">
                                        <form id="login-form" className="form" onSubmit={this.HandleLogin}>
                                            <h3 className="text-center text-info">Login</h3>
                                            <div className="form-group">
                                                <label className="text-info">Usuario:</label><br />
                                                <input type="text" name="username" id="username" className="form-control" onChange={this.handleLoginChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label  className="text-info">Senha:</label><br />
                                                <input type="password" name="password" id="password" className="form-control" onChange={this.handlePasswordChange} required/>
                                            </div>
                                            <div className="form-group">
                                                <label  className="text-info"><span><input id="remember-me" name="remember-me" type="checkbox" /></span><span>Lembre de mim</span> </label><br />
                                                <input type="submit" className="btn btn-info btn-md" id="LoginButton" value="Entrar" />
                                            </div>
                                            <div id="register-link" className="text-right">
                                                <Link to="/Cadastro" className="text-info">Cadastrar</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Zoom>
            </div>
        )
    }

}

export default Login