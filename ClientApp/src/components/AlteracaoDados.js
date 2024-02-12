import React, { Component } from "react";
import '../CSS/AlteracaoDados.css';
import Nav from './Nav'
import Zoom from 'react-reveal/Zoom';

class AlteracaoDados extends Component {
    static displayName = "Pessoas";

    constructor() {
        super();
        this.state = { pessoa: [] };
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        this.ChargePeople();
    }

    async ChargePeople() {
        var id = this.props.match.params["id"];
        const response = await fetch('api/Pessoa/' + id);
        const dataz = await response.json();
        this.setState({ pessoa: dataz });
    }

    editScreen() {
        return (
            <div>
                <Nav />
                <div className="container-md">
                    <div>
                        <form onSubmit={this.handleEdit}>
                            <div id="textFields">
                                <h3>Dados do Usuário</h3>
                                <div className="row align-items-center">
                                    <div className="col">
                                        <input className="form-control" id="NomeCampo" type="hidden" name="id" placeholder="id" defaultValue={this.state.pessoa.id} />
                                        <input className="form-control" id="NomeCampo" type="text" name="nome" placeholder="Nome" defaultValue={this.state.pessoa.nome} required />
                                        <input className="form-control" id="CPFCampo" type="text" name="cpf" minlength="11" maxlength="11" placeholder="CPF" defaultValue={this.state.pessoa.cpf} required />
                                        <input className="form-control" id="TelCampo" type="text" name="cel" minlength="10" maxlength="10" placeholder="Telefone" defaultValue={this.state.pessoa.cel} />
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div id="buttons">
                                            <Zoom bottom>
                                                <button type="submit" className="btn btn-primary" >Alterar Dados</button>
                                                <button type="button" className="btn btn-danger" onClick={(id) => HandleDeleteItem(this.state.pessoa.id)} >Deletar Usuário</button>
                                            </Zoom>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <input className="form-control" id="CEPCampo" type="text" name="cep" placeholder="CEP" defaultValue={this.state.pessoa.cep} />
                                        <input className="form-control" id="enderecoCampo" type="text" name="endereco" placeholder="Endereco" defaultValue={this.state.pessoa.endereco} />
                                        <input className="form-control" id="CidadeCampo" type="text" name="cidade" placeholder="Cidade" defaultValue={this.state.pessoa.cidade} />
                                        <input className="form-control" id="EstadoCampo" type="text" name="estado" placeholder="Estado" defaultValue={this.state.pessoa.estado} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let editScreenv = this.editScreen();

        return (
            <div>
                {editScreenv}
            </div>
        )
    }

    handleEdit(event) {
        if (!window.confirm("Você deseja realmente alterar os dados?")) {
            return;
        }
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('api/Pessoa/' + this.state.pessoa.id, { method: 'PUT', body: data })
        window.location.href = "/";
    }
}

function HandleDeleteItem(id) {
    if (!window.confirm("Você deseja realmente deletar este usuário?")) {
        return;
    }
    fetch('api/Pessoa/' + id, { method: 'delete' })
        .then(json => {
            fetch('api/Login/' + id, { method: 'delete' })
        })
            window.location.href = "/";
            alert('Usuário deletado com Sucesso!');
}

export default AlteracaoDados