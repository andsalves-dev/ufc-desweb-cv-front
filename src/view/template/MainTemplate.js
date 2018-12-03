// Library imports
import * as React from 'react';
import {PureComponent} from "react";
import SystemNavbar from "./../pages/components/SystemNavbar";
import connect from "react-redux/es/connect/connect";
import {Loader} from "react-overlay-loader";
import {Redirect} from "react-router-dom";

class MainTemplate extends PureComponent {

    render() {
        const {isLoading, user} = this.props;

        if (isLoading) {
            return <Loader fullPage loading/>;
        }

        if (!user) {
            return <Redirect to="/login" />
        }

        return (
            <div className="page-template">
                <SystemNavbar/>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        isLoading: state.userReducer.isLoading,
        userRequested: state.userReducer.userRequested,
    };
}

export default connect(mapStateToProps, null)(MainTemplate);