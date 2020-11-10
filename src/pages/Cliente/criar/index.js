import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarCliente extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            cliente: {
                nome: "",
                endereço: "",
                email: "",
                telefone: ""
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
            return <Redirect to="/clientes" />;
        } else {
            return (
                <div className="criar">
                <center><form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <center><legend>Cadastrar Cliente</legend> </center>
                        <div className="cliente-insert">
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
                                value={this.state.cliente.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="cliente-insert">
                            <label htmlFor="endereço">Endereço </label>
                            <br />
                            <input
                                type="text"
                                id="endereço"
                                name="endereço"
                                placeholder="Endereço"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.endereço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="cliente-insert">
                            <label htmlFor="email">Email </label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="cliente-insert">
                            <label htmlFor="telefone">Telefone </label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="Telefone"
                                required
                                value={this.state.cliente.telefone}
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
            cliente: { ...prevState.cliente, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/cliente`, 
        {
            method: "post",
            body: JSON.stringify(this.state.cliente),
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
 
export default CriarCliente;
