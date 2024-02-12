import React, { Component } from "react";
import '../CSS/dadosUsuario.css';
import Nav from './Nav'

class DadosUsuario extends Component {
    constructor() {
        super();
        this.state = { pessoa: [] };
    }

    componentDidMount() {
        this.ChargePeople();
    }

    async ChargePeople() {
        var id = this.props.match.params["id"];
        const response = await fetch('api/Pessoa/' + id);
        const data = await response.json();
        this.setState({ pessoa: data });
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container emp-profile">
                    <form method="post">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5>
                                        {this.state.pessoa.nome}
                                    </h5>

                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" href ="/" id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">Dados</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.pessoa.nome}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>CPF</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.pessoa.cpf}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Telefone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.pessoa.cel}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Cidade</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.pessoa.cidade}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Estado</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.pessoa.estado}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Endereço</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.pessoa.endereco}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>CEP</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.pessoa.cep}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default DadosUsuario