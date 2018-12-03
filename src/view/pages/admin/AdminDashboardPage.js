import React, {PureComponent} from 'react';
import {Button} from 'react-bootstrap'
import MainTemplate from "../../template/MainTemplate";
import cvsActions from "../../../model/actions/cvs";
import connect from "react-redux/es/connect/connect";
import {Loader} from "react-overlay-loader";
import * as toastr from 'toastr';

class AdminDashboardPage extends PureComponent {

    componentDidMount() {
        this.props.loadCVs();
    }

    toggleBlock = (id, cv) => {
        cv.status = cv.status === 'blocked' ? 'active' : 'blocked';

        this.props.updateCV(id, cv, (ok) => {
            if (ok) {
                toastr.success('Curriculo atualizado!', 'Êxito');
                this.props.loadCVs();
            } else {
                toastr.error('Erro ao bloquear/desbloquear currículo!');
            }
        });
    };

    removeCV = (id) => {
        this.props.removeCV(id, (ok) => {
            if (ok) {
                toastr.success('Curriculo removido!', 'Êxito');
                this.props.loadCVs();
            } else {
                toastr.error('Erro ao tentar remover currículo!');
            }
        });
    };

    render() {
        const {isLoading, cvs} = this.props;

        if (isLoading) {
            return <Loader loading/>
        }

        return (
            <MainTemplate>
                <div className="container p-5">
                    <h2 className="pb-2">Lista de Currículos</h2>

                    <label className="col-sm-12">
                        <label className="badge badge-danger col-sm-12">{''}</label>
                    </label>

                    <label className="col-sm-12">
                        <label className="badge badge-success col-sm-12">{''}</label>
                    </label>

                    <table className="table">
                        <thead>
                        <tr className="d-flex">
                            <th className="col-7">Nome</th>
                            <th className="col-2">Status</th>
                            <th className="col-3">Ação</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            cvs && cvs.map((cv, key) => (
                                <tr className="d-flex" key={key}>
                                    <td className="col-7">{cv.user && cv.user.name}</td>
                                    <td className="col-2">{cv.status}</td>
                                    <td className="col-3">
                                        <Button bsSize="small" bsStyle="primary" className="mr-2"
                                                href={`/admin/view-cv/${cv.id}`}>
                                            ver
                                        </Button>

                                        <Button bsSize="small" bsStyle={cv.status === 'blocked' ? 'success' : 'warning'}
                                                className="mr-2" onClick={() => this.toggleBlock(cv.id, {...cv})}>
                                            {cv.status === 'blocked' ? 'des' : ''}bloquear
                                        </Button>

                                        <Button bsSize="small" bsStyle="danger" className="mr-2"
                                                onClick={() => this.removeCV(cv.id)}>
                                            remover
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
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
        loadCVs: () => dispatch(cvsActions.loadCVs()),
        updateCV: (id, data, callback) => dispatch(cvsActions.updateCV(id, data, callback)),
        removeCV: (id, callback) => dispatch(cvsActions.removeCV(id, callback)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardPage);