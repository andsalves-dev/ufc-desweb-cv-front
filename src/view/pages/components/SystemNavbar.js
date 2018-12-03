// Library imports
import * as React from 'react';
import {PureComponent} from "react";
import {NavLink} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

const menus = {
    admin: [
        {name: 'CVS', to: '/admin'},
        // {name: 'Users', to: '/admin/users'},
        // {name: 'Meus Dados', to: '/profile'},
    ],
    users: [
        {name: 'Meu CV', to: '/user'},
        // {name: 'Meus Dados', to: '/profile'},
    ]
};

class SystemNavbar extends PureComponent {

    render() {
        let menuOptions = [];

        if (this.props.user) {
            switch (this.props.user.role) {
                case 'admin':
                    menuOptions = menus.admin;
                    break;
                case 'user':
                    menuOptions = menus.users;
                    break;
                default:
            }
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            menuOptions.map((menu, key) => (
                                <li className="nav-item" key={key}>
                                    <NavLink className="nav-link" to={menu.to}>{menu.name}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                    <div>
                        <NavLink className="nav-link btn-sm" to="/logout">Sair</NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    };
}

export default connect(mapStateToProps, null)(SystemNavbar);