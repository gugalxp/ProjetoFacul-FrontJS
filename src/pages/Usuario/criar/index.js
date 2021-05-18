import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarUsuario extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuario: {
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
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Formulário Usuário</legend>
                        
                        <div className="usuario-insert">
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
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="usuario-insert">
                            <label htmlFor="endereço">endereço</label>
                            <br />
                            <input
                                type="text"
                                id="endereço"
                                name="dendereço"
                                placeholder="endereço"
                                required
                                value={this.state.usuario.endereço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="usuario-insert">
                            <label htmlFor="email">email</label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="email"
                                required
                                value={this.state.usuario.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
                        <div className="usuario-insert">
                            <label htmlFor="telefone">telefone</label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="telefone"
                                required
                                value={this.state.usuario.telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
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
            usuario: { ...prevState.usuario, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch('${process.env.REACT_APP_API_URL}/sistema/usuarios', {
            method: "post",
            body: JSON.stringify(this.state.usuario),
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
 
export default CriarUsuario;