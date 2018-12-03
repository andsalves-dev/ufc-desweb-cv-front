import React, {PureComponent} from "react";
import {connect} from 'react-redux';

import userActions from './../../model/actions/user';
import {Loader} from "react-overlay-loader";
import {NavLink} from "react-router-dom";
import {userHomeURL} from "../../model/util/util";
import {Alert} from "react-bootstrap";

class LoginPage extends PureComponent {

    constructor(props) {
        super(props);

        this.username = React.createRef();
        this.password = React.createRef();
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.userLogin(this.username.current.value, this.password.current.value);
    };

    render() {
        const {isLoading, user, error} = this.props;

        if (user) {
            window.location.href = userHomeURL(user);
            return null;
        }

        return (
            <div className="login-page container">
                <div className="panel panel-default mx-auto mt-5">
                    <div className="page-header">
                        <h1>Login</h1>
                    </div>

                    {
                        error &&
                        <Alert bsStyle="warning">{error}</Alert>
                    }

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                   placeholder="Email" disabled={isLoading} ref={this.username}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Senha</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   placeholder="Senha" disabled={isLoading} ref={this.password}/>
                        </div>

                        <button type="submit" className="btn btn-default" disabled={isLoading}>
                            Submit
                        </button>

                        <Loader loading={isLoading}/>

                        <hr />
                        <div className="text-center">
                            <NavLink className="btn-sm" to="/register">Registrar-se</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        error: state.userReducer.error,
        isLoading: state.userReducer.isLoading,
        userRequested: state.userReducer.userRequested,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogin: (username, password) => dispatch(userActions.userLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);