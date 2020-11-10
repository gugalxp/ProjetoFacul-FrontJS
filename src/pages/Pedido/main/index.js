import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedido: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(` ${process.env.REACT_APP_API_URL}/sistema/pedidos`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedido } = this.state;
 
        return (
            <div className="pedido-list">
                <div class="buttons">
                <Link to={`pedidos`}> <button type="button" class="btn btn-secondary btn-lg">Pedidos</button> </Link> &nbsp;
                <Link to={`produtos`}> <button type="button" class="btn btn-secondary btn-lg">Produtos</button> </Link> &nbsp;
                <Link to={`clientes`}> <button type="button" class="btn btn-secondary btn-lg">Clientes</button> </Link> &nbsp;
                </div>
                <center><h1>Clientes</h1> </center>
                <Link to={`/criarPedido`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Pedido</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.map((pedido, index) => (
                            <tr>
                                <th scope="row">{pedido.id}</th>
                                <td>{pedido.pedido}</td>
                                <td>{pedido.cliente}</td>
                                <td>{pedido.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{pedido.quantidade}</td>
                                <td> <Link to={`/pedidos/${pedido.id}`}> <button type="button" class="btn btn-primary btn-sm">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarpedido/${pedido.id}`}> <button type="button" class="btn btn-warning btn-sm">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarpedido/${pedido.id}`}> <button type="button" class="btn btn-danger btn-sm">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
