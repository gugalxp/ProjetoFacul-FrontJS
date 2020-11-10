import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarPedido extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedido: {
                nome: "",
                salario: "",
                dataNascimento: "",
                ativo: "true"
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
            return <Redirect to="/pedidos" />;
        } else {
            return (
                <div className="criar">
                <center><form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Cadastrar Pedido</legend>
                        <div className="pedido-insert">
                            <label htmlFor="pedido">Pedido </label>
                            <br />
                            <input
                                type="text"
                                id="pedido"
                                name="pedido"
                                placeholder="Pedido"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedido.pedido}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert">
                            <label htmlFor="valor">Cliente </label>
                            <br />
                            <input
                                type="text"
                                id="cliente"
                                name="cliente"
                                placeholder="Cliente"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedido.cliente}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert">
                            <label htmlFor="valor">Valor </label>
                            <br />
                            <input
                                type="text"
                                id="valor"
                                name="valor"
                                placeholder="Valor"
                                minLength="1"
                                maxLength="100"
                                required
                                value={this.state.pedido.valor}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedido-insert">
                            <label htmlFor="quantidade">Quantidade </label>
                            <br />
                            <input
                                type="text"
                                id="quantidade"
                                name="quantidade"
                                placeholder="Quantidade"
                                minLength="1"
                                maxLength="100"
                                required
                                value={this.state.pedido.quantidade}
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
            pedido: { ...prevState.pedido, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}sistema/pedidos`,
         {
            method: "post",
            body: JSON.stringify(this.state.pedido),
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
 
export default CriarPedido;
