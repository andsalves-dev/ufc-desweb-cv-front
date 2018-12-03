import React, {PureComponent} from 'react';
import {Button, Modal} from 'react-bootstrap'
import cvsActions from "../../../model/actions/cvs";
import connect from "react-redux/es/connect/connect";
import {Loader} from "react-overlay-loader";
import MainTemplate from "../../template/MainTemplate";
import * as toastr from 'toastr';

class UserDashboardPage extends PureComponent {

    state = {
        photoUrl: null,
        photoChanged: false,
        editingCV: null,
        editingSection: null,
        editorInstance: null
    };

    componentDidMount() {
        if (!this.props.cvs || this.props.cvs.length === 0) {
            this.props.loadCVs();
        }

        if (this.props.cvs && this.props.cvs[0] && this.props.cvs[0].id) {
            this.props.loadCV(this.props.cvs[0].id);
        }
    }

    componentDidUpdate(newProps) {
        const changed = newProps.cvs !== this.props.cvs;

        if (changed && this.props.cvs && this.props.cvs[0] && this.props.cvs[0].id) {
            this.props.loadCV(this.props.cvs[0].id);
        }

        if (this.props.cv) {
            this.editCV();
        }
    }

    changePhotoClick = () => {
        const inputFileEl = document.querySelector('.input-file-change-photo');

        if (inputFileEl) {
            inputFileEl.click();

            inputFileEl.addEventListener('change', (event) => {
                this.setState({
                    photoUrl: URL.createObjectURL(event.target['files'][0]),
                    photoChanged: true
                });
            });
        }
    };

    saveNewPhoto = () => {

    };

    currentPhotoAction = () => ({
        method: this.state.photoChanged ? this.saveNewPhoto : this.changePhotoClick,
        text: this.state.photoChanged ? 'salvar' : `${this.state.photoUrl ? 'mudar' : 'adicionar'} foto`,
    });

    editCV = () => {
        let editingCV = null;

        if (!this.props.cv) {
            editingCV = {
                sections: [],
                status: 'active',
                user: this.props.user
            }
        } else {
            editingCV = this.props.cv;
        }

        this.setState({editingCV});
    };

    saveCV = () => {
        if (this.state.editingCV) {
            const defaultCallback = (ok) => {
                if (ok) {
                    toastr.success('Currículo salvo!');
                    window.location.go(0);
                } else {
                    toastr.error('Erro ao atualizar currículo');
                }
            };

            if (this.props.cv && this.props.cv.id) {
                this.props.updateCV(this.props.cv.id, this.state.editingCV, defaultCallback);
            } else {
                this.props.createCV(this.state.editingCV, defaultCallback);
            }
        }
    };

    editSection = (sectionIndex, content, title) => {
        this.setState({
            editingSection: {
                index: sectionIndex,
                content,
                title
            }
        });

        setTimeout(() => {
            window.ClassicEditor.create(document.getElementById('section_input_id')).then(editorInstance => {
                this.setState({editorInstance});
            });
        }, 40);
    };

    addSection = () => {
        this.editSection(this.state.editingCV.sections.length, '', '');
    };

    saveSection = () => {
        if (this.state.editingSection) {
            let editingCV = this.state.editingCV;

            editingCV.sections[this.state.editingSection.index] = {
                content: this.state.editorInstance.getData(),
                title: this.state.editingSection.title,
            };

            this.setState({editingCV, editingSection: null});
        }
    };

    onChangeSectionInput = (event, field) => {
        const editingSection = this.state.editingSection;
        editingSection[field] = event.target.value;

        this.setState({editingSection});
    };

    render() {
        let {cv, isLoading} = this.props;

        if (isLoading) {
            return <Loader fullPage loading/>;
        }

        if (!cv && !this.state.editingCV) {
            return (
                <MainTemplate>
                    <div className="container p-5 mb-5">
                        <p>
                            Currículo não cadastrado.
                        </p>
                        <Button bsSize="small" bsStyle="primary" onClick={() => this.editCV()}>
                            Adicionar currículo
                        </Button>
                    </div>
                </MainTemplate>
            );
        }

        if (this.state.editingCV) {
            cv = this.state.editingCV;
        }

        const {photoUrl} = this.state;
        const photoAction = this.currentPhotoAction();

        return (
            <MainTemplate>
                <div className="container p-5 mb-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-9">
                                    <h3 className="card-title">
                                        Dados Pessoais
                                    </h3>
                                    <label>Name: &nbsp;</label>{cv && cv.user.name}<br/>
                                    <label>Email: &nbsp;</label>{cv && cv.user.email}
                                </div>
                                <div className="col-sm-3">
                                    <div className="user-photo-wrapper mx-2">
                                        <div className="img-holder">
                                            <img src={photoUrl} alt=""/>
                                        </div>

                                        <Button bsStyle="link" bsSize="small" className="p-0 btn-change-photo"
                                                onClick={photoAction.method}>
                                            <small>{photoAction.text}</small>
                                        </Button>

                                        <input type="file" className="w-0 d-none input-file-change-photo"/>
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
                                            <div className="card-text"
                                                 dangerouslySetInnerHTML={{__html: section.content}}/>
                                        </div>
                                        <Button bsStyle="link" className="mt-2" bsSize="small"
                                                onClick={() => this.editSection(key, section.content, section.title)}>
                                            editar seção
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="row">
                        {
                            this.state.editingCV &&
                            <div className="col-sm-12">
                                <Button bsStyle="link" className="mt-2" bsSize="small"
                                        onClick={() => this.addSection()}>
                                    Adicionar seção
                                </Button>
                            </div>
                        }

                        {
                            this.state.editingCV &&
                            <div className="col-sm-12">
                                <Button bsStyle="success" className="mt-4" onClick={() => this.saveCV()}>
                                    Salvar
                                </Button>
                            </div>
                        }
                    </div>

                    {
                        this.state.editingSection && this.state.editingSection &&
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Modificar/adicionar seção</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <label className="form-group col-sm-12 p-0 mb-1 mt-4">
                                    Título da Seção:
                                    <input className="form-control" defaultValue={this.state.editingSection.title}
                                           onChange={(event) => this.onChangeSectionInput(event, 'title')}/>
                                </label>
                                <textarea title="" id="section_input_id"
                                          defaultValue={this.state.editingSection.content}
                                          onChange={(event) => this.onChangeSectionInput(event, 'content')}
                                />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={() => this.setState({editingSection: null})}>Close</Button>
                                <Button bsStyle="primary" onClick={() => this.saveSection()}>
                                    Update
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    }

                </div>
            </MainTemplate>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        isLoading: state.cvsReducer.isLoading,
        cv: state.cvsReducer.cv,
        cvs: state.cvsReducer.cvs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadCV: (id) => dispatch(cvsActions.loadCV(id)),
        loadCVs: (id) => dispatch(cvsActions.loadCVs()),
        updateCV: (id, data, callback) => dispatch(cvsActions.updateCV(id, data)),
        createCV: (data, callback) => dispatch(cvsActions.createCV(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardPage);
