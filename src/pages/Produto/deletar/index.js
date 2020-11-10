import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
class DeletarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {},
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(` ${process.env.REACT_APP_API_URL}sistema/produtos/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produto: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <fieldset>
                    <legend>Deletar Produto</legend>
                    <div className="produto-delete">
                        <label htmlFor="nome">{this.state.produto.nome} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>
 
                        <button type="button" class="btn btn-danger btn-sm" onClick={this.handleClick}>Remove</button>
                        <br /><br />
                        <Link to={`/produtos`}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/produtos/${id}`, {
            method: "delete"
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default DeletarProduto;
