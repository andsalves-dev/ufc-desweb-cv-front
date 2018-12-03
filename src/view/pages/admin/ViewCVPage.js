import React, {PureComponent} from 'react';
import {Button} from "react-bootstrap";
import cvsActions from "../../../model/actions/cvs";
import connect from "react-redux/es/connect/connect";
import {Loader} from "react-overlay-loader";
import NotFound from "../NotFound";
import MainTemplate from "../../template/MainTemplate";

class ViewCVPage extends PureComponent {

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.loadCV(this.props.match.params.id);
        }
    }

    render() {
        const {cv, isLoading} = this.props;

        if (isLoading) {
            return <Loader fullPage loading/>;
        }

        if (!cv) {
            return <NotFound description="Currículo não encontrado!"/>;
        }

        return (
            <MainTemplate>
                <div className="container p-5 mb-5">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Button className="p-0" bsStyle="link" href="/admin">Listar</Button>
                            </li>
                            <li className="breadcrumb-item">Ver Currículo</li>
                        </ol>
                    </nav>

                    <h2 className="pb-5">Usuário: Ands</h2>

                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-9">
                                    <h3 className="card-title">
                                        Dados Pessoais
                                    </h3>
                                    <label>Name: &nbsp;</label>{cv.user.name}<br/>
                                    <label>Email: &nbsp;</label>{cv.user.email}
                                </div>
                                <div className="col-sm-3">
                                    <div className="user-photo-wrapper mx-2">
                                        <div className="img-holder">
                                            <img src={cv.photo_url} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cv-sections">
                        {
                            cv.sections.map((section, key) => (
                                <div key={key}>
                                    <div className="card col-sm-12">
                                        <div className="card-body">
                                            <h5 className="card-title">{section.title}</h5>
                                            <div className="card-text">
                                                {section.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </MainTemplate>
        );
    }
}

function mapStateToProps(state) {
    return state.cvsReducer;
}

function mapDispatchToProps(dispatch) {
    return {
        loadCV: (id) => dispatch(cvsActions.loadCV(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCVPage);