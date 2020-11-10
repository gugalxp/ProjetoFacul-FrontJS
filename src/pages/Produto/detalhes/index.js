import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Produto extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(` ${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
 
        return (
            <div className="produto-info">
                <h1> {produto.nome} </h1>
                <h1> {"Preço de Custo: " + produto.preço_de_custo} </h1>
                <h1> {"Preço de Venda: " + produto.preço_de_venda} </h1>
                <h1> {"Quantidade no Estoque: " + produto.qtd_estoque} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarProduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarProduto/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
