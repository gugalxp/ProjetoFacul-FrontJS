import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                nome: "",
                preço_de_custo: "",
                preço_de_venda: ""
            },
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
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div className="produto-update">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="preço_de_custo">Preço de Custo </label>
                            <br />
                            <input
                                type="text"
                                id="preço_de_custo"
                                name="preço_de_custo"
                                placeholder="Preço de Custo"
                                min="1"
                                max="99999"
                                required
                                value={this.state.produto.preço_de_custo}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="preço_de_venda">Preço de Venda </label>
                            <br />
                            <input
                                type="text"
                                id="preço_de_venda"
                                name="preço_de_venda"
                                placeholder="Preço de Venda"
                                min="1"
                                max="99999"
                                required
                                value={this.state.produto.preço_de_venda}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="qtd_estoque">Quantidade no Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="qtd_estoque"
                                name="qtd_estoque"
                                placeholder="Quantidade"
                                min="1"
                                max="99999"
                                required
                                value={this.state.produto.preço_de_venda}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
 
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.produto;
 
        fetch(`http://localhost:3003/sistema/produtos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
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
 
export default EditarProduto;
