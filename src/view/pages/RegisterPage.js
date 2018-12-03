import React, {PureComponent} from "react";
import userActions from "../../model/actions/user";
import connect from "react-redux/es/connect/connect";
import * as toastr from 'toastr';
import {withRouter} from "react-router-dom";
import {Alert} from "react-bootstrap";
import {Loader} from "react-overlay-loader";

class RegisterPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        };
    }

    onChange = (event) => {
        if (event.target.name) {
            this.setState({
                [event.target.name]: event.target.value || ''
            });
        }
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.userRegister(this.state, (boolResult) => {
            if (boolResult) {
                toastr.success('Cadastro realizado com sucesso!', 'Êxito');
                this.props.history.push('/login');
            }
        });
    };

    formIsValid = () => {
        const {name, email, password, passwordConfirmation} = this.state;

        return Boolean(name && email && password && (password === passwordConfirmation));
    };

    render() {
        const {error, isLoading} = this.props;

        return (
            <div className="login-page container">
                {isLoading && <Loader loading/>}
                <div className="panel panel-default mx-auto mt-5">
                    <div className="page-header">
                        <h1>Fazer cadastro</h1>
                    </div>

                    {
                        error &&
                        <Alert bsStyle="warning">{error}</Alert>
                    }
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Nome</label>
                            <input type="text" className="form-control" placeholder="Nome"
                                   onChange={this.onChange} name="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" placeholder="Email"
                                   onChange={this.onChange} name="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Senha</label>
                            <input type="password" className="form-control" placeholder="Senha"
                                   onChange={this.onChange} name="password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Confirmação de senha</label>
                            <input type="password" className="form-control" placeholder="Confirmação de senha"
                                   onChange={this.onChange} name="passwordConfirmation"/>
                            <label className="badge">
                                {
                                    this.state.password !== this.state.passwordConfirmation &&
                                    'As senhas não conferem'
                                }
                            </label>
                        </div>

                        <button type="submit" className="btn btn-default" disabled={!this.formIsValid()}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.userReducer;
}

function mapDispatchToProps(dispatch) {
    return {
        userRegister: (data, callback) => dispatch(userActions.userRegister(data, callback))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));
