import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            cliente: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { cliente } = this.state;
 
        return (

            <div className="cliente-list">
                
                <div class="buttons">
                <Link to={`pedidos`}> <button type="button" class="btn btn-secondary btn-lg">Pedidos</button> </Link> &nbsp;
                <Link to={`produtos`}> <button type="button" class="btn btn-secondary btn-lg">Produtos</button> </Link> &nbsp;
                <Link to={`clientes`}> <button type="button" class="btn btn-secondary btn-lg">Clientes</button> </Link> &nbsp;
                </div>
                
                <div className="table-display">
                    <br />
                    <center><h1>Clientes</h1> </center>
                    <Link to={`/criarCliente`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                    <br /><br />
 
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Endereço</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefone</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cliente.map((cliente, index) => (
                                <tr>
                                    <th scope="row">{cliente.id}</th>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.endereço}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefone}</td>
                                    <td> <Link to={`/clientes/${cliente.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                    <td> <Link to={`/editarCliente/${cliente.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link> </td>
                                    <td> <Link to={`/deletarCliente/${cliente.id}`}> <button type="button" class="btn btn-danger">Excluir</button>  </Link> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}