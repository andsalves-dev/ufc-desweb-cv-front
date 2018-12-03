import React, {PureComponent} from "react";

class NotFound extends PureComponent {

    render() {
        return (
            <div className="container pt-5">
                <div className="col-sm-6 mx-auto">
                    <h3>404 Not Found</h3>
                    <h5>{this.props.description || 'Página não encontrada!'}</h5>
                </div>
            </div>
        );
    }
}

export default NotFound;