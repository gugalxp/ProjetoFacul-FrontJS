import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                nome: "",
                preço_de_custo: "",
                preço_de_venda: "",
                qtd_estoque: ""
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
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <div className="criar">
                <center><form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Cadastrar Produto</legend>
                        <div className="produto-insert">
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
                        <div className="produto-insert">
                            <label htmlFor="preço_de_custo">Preço de Custo </label>
                            <br />
                            <input
                                type="text"
                                id="preço_de_custo"
                                name="preço_de_custo"
                                placeholder="Preço de Custo"
                                required
                                value={this.state.produto.preço_de_custo}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="preço_de_venda">Preço de Venda </label>
                            <br />
                            <input
                                type="text"
                                id="preço_de_venda"
                                name="preço_de_venda"
                                placeholder="Preço de Venda"
                                required
                                value={this.state.produto.preço_de_venda}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="qtd_estoque">Quantidade no Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="qtd_estoque"
                                name="qtd_estoque"
                                placeholder="Quantidade no Estoque"
                                required
                                value={this.state.produto.qtd_estoque}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form> </center>
                </div>
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
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(" ${process.env.REACT_APP_API_URL}sistema/produtos", 
        {
            method: "post",
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
 
export default CriarProduto;
