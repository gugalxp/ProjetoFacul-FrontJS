import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuarios: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios`)
            .then(usuarios =>
                usuarios.json().then(usuarios => this.setState({ usuarios }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { usuario } = this.state;
 
        return (
            <div className="usuario-list">

                <div class="buttons">
                <Link to={`pedidos`}> <button type="button" class="btn btn-secondary btn-lg">Pedidos</button> </Link> &nbsp;
                <Link to={`produtos`}> <button type="button" class="btn btn-secondary btn-lg">Produtos</button> </Link> &nbsp;
                <Link to={`usuarios`}> <button type="button" class="btn btn-secondary btn-lg">Clientes</button> </Link> &nbsp;
                </div>

                <Link to={`/criarUsuario`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuario.map((usuarios, index) => (
                            <tr>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuarios.nome}</td>
                                <td>{usuarios.endereço}</td>
                                <td>{usuarios.email}</td>
                                <td>{usuarios.telefone}</td>
                                <td> <Link to={`/usuarios/${usuarios.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarUsuario/${usuarios.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarUsuario/${usuarios.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}



