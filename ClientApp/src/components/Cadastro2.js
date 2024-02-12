import React, { Component } from "react"
import { Link } from 'react-router-dom'
import '../CSS/cadastro.css';

export default class Cadastro2{
    render() {
        return(
            <div className="container-md">
                <div>
                    <h3>Cadastro</h3>
                    <div id="textFields">
                        <div className="row align-items-center">
                            <div className="col">
                                <input className="form-control" id="NomeCampo" type="text" placeholder="Nome" required />
                                <input className="form-control" id="CPFCampo" type="text" placeholder="CPF" required />
                            </div>
                            <div className="col">
                                <input className="form-control" id="TelCampo" type="text" placeholder="Telefone" />
                                <input className="form-control" id="CEPCampo" type="text" placeholder="CEP" />
                            </div>
                            <div className="col">
                                <input className="form-control" id="CidadeCampo" type="text" placeholder="Cidade" />
                                <input className="form-control" id="EstadoCampo" type="text" placeholder="Estado" />
                            </div>
                        </div>
                    </div>

                    <button id="btnSignUp" type="button" className="btn btn-primary" onClick={this.handleSalve}>Cadastrar</button>

                    <h3>Listagem de Pessoas Cadastradas no sistema</h3>

                    <table className='table table-dark' aria-labelledby="tabelLabel" >
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
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}