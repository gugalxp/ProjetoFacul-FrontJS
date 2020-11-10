import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Pedido extends Component {
    state = {
        pedido: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(` ${process.env.REACT_APP_API_URL}sistema/pedidos/${id}`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedido } = this.state;
 
        return (
            <div className="pedido-info">
                <h1> {pedido.pedido} </h1>
                <h1> {pedido.cliente} </h1>
                <h1> {"Valor: " + pedido.valor} </h1>
                <h1> {"Quantidade no Estoque: " + pedido.quantidade} </h1>
                <br />
                <Link to={`/pedidos`}> Voltar </Link> <br />
                <Link to={`/editarPedido/${pedido.id}`}> Editar </Link> <br />
                <Link to={`/deletarPedido/${pedido.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}