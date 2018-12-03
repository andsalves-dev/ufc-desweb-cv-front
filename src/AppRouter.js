import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './css/main.css';
import {Provider} from "react-redux";
import * as Pages from "./view/pages";
import userActions from "./model/actions/user";
import connect from "react-redux/es/connect/connect";

class AppRouter extends PureComponent {

    render() {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <Switch>
                        <Redirect exact from="/" to="/login"/>

                        <Route path="/login" component={Pages.LoginPage}/>
                        <Route path="/register" component={Pages.RegisterPage}/>

                        <Route exact path="/admin" component={Pages.AdminDashboardPage}/>
                        <Route exact path="/admin/view-cv/:id" component={Pages.ViewCVPage}/>

                        <Route exact path="/user" component={Pages.UserDashboardPage}/>

                        <Route path="/logout" render={() => {
                            this.props.userLogout();
                            return <Redirect to="/login"/>
                        }}/>

                        <Route component={Pages.NotFound} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(userActions.userLogout())
    }
}

export default connect(null, mapDispatchToProps)(AppRouter);