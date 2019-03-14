import React, { Component } from 'react';
import { Button, Modal, Form, FormGroup, Input, ModalFooter, Card, CardImg } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUploader from 'react-images-upload';

import * as userActions from '../../actions/user.action';
import { path } from '../../constants/path';

export class UserModal extends Component {
    state = {
        id: 0,
        name: '',
        email: '',
        gender: '',
        picture: [],
        displayPic: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let data = new FormData();
        if (!this.props.user) {
            data.append('name', this.state.name)
            data.append('email', this.state.email)
            data.append('gender', this.state.gender)
            data.append('picture', this.state.picture)
            this.props.addUser(data, config);
        }
        else {
            let user = this.props.user;
            user.name = this.state.name;
            user.email = this.state.email;
            user.gender = this.state.gender;
            data.append('name', this.state.name)
            data.append('email', this.state.email)
            data.append('gender', this.state.gender)
            data.append('picture', this.state.picture)
            this.props.editUser(user.id, user, data, config)
        }
        this.closeModal();
    }
    closeModal = () => {
        this.setState({ name: '', email: '', gender: '', id: 0, picture: [], displayPic: '' })
        this.props.toggle();
    }
    componentWillReceiveProps = (props) => {
        if (props.user) {
            this.setState({
                id: props.user.id,
                name: props.user.name,
                email: props.user.email,
                gender: props.user.gender,
                displayPic: (props.user.picture === 'def_fem.jpg' || props.user.picture === 'def_male.jpg' ? '' : path + props.user.picture)
            })
        }
    }
    removeImage = () => {
        this.setState({ picture: [], displayPic: '' })
    }
    onDrop = (img) => {
        let reader = new FileReader();
        reader.readAsDataURL(img[0]);
        reader.onloadend = () => {
            this.setState({
                picture: img[0],
                displayPic: reader.result
            });
        }
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.closeModal}>
                <Form style={{ margin: '20px' }} onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type='text' name='name' placeholder='Name' defaultValue={this.state.name} onChange={this.handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Input type='email' name='email' placeholder='Email' defaultValue={this.state.email} onChange={this.handleChange} required />
                    </FormGroup>
                    Gender:
                    <FormGroup check>
                        <Input type='radio' name='gender' value="Male" onChange={this.handleChange} defaultChecked={this.state.gender === "Male"} required />
                        Male
                    </FormGroup>
                    <FormGroup check>
                        <Input type='radio' name='gender' value="Female" onChange={this.handleChange} defaultChecked={this.state.gender === "Female"} required />
                        Female
                    </FormGroup>
                    {
                        this.state.displayPic === '' ? < ImageUploader
                            withIcon={true}
                            name='picture'
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            singleImage={true} accept={"image/*"}
                            maxFileSize={5242880} /> :
                            <div style={{ margin: 'auto', width: '39%' }}>
                                <Card style={{ height: '150px', width: "150px" }}>
                                    <Button close onClick={this.removeImage} />
                                    <CardImg src={this.state.displayPic} alt='' width='100%' height='100%' />
                                </Card>
                            </div>
                    }
                    <ModalFooter>
                        {this.props.user ? <Button type='submit' className='update' color='info'>Update</Button> :
                            <Button type='submit' className='submit' color='info'>Submit</Button>}
                        <Button className='cancel' onClick={this.closeModal} color='danger'>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        addUser: bindActionCreators(userActions.addUserAction, dispatch),
        editUser: bindActionCreators(userActions.editUserAction, dispatch)
    }
}

export default connect(null, mapDispatch)(UserModal);