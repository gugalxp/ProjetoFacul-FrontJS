import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(` ${process.env.REACT_APP_API_URL}/sistema/produtos`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
 
        return (
            <div className="produto-list">
                <div class="buttons">
                <Link to={`pedidos`}> <button type="button" class="btn btn-secondary btn-lg">Pedidos</button> </Link> &nbsp;
                <Link to={`produtos`}> <button type="button" class="btn btn-secondary btn-lg">Produtos</button> </Link> &nbsp;
                <Link to={`clientes`}> <button type="button" class="btn btn-secondary btn-lg">Clientes</button> </Link> &nbsp;
                </div>
                <Link to={`/criarProduto`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço de Custo</th>
                            <th scope="col">Preço de Venda</th>
                            <th scope="col">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produto.map((produto, index) => (
                            <tr>
                                <th scope="row">{produto.id}</th>
                                <td>{produto.nome}</td>
                                <td>{produto.preço_de_custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produto.preço_de_venda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produto.qtd_estoque ? "Sim" : "Não"}</td>
                                <td> <Link to={`/produtos/${produto.id}`}> <button type="button" class="btn btn-primary btn-sm">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarproduto/${produto.id}`}> <button type="button" class="btn btn-warning btn-sm">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarproduto/${produto.id}`}> <button type="button" class="btn btn-danger btn-sm">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
