import React, { Component } from 'react';
import { Button, Modal, Form, FormGroup, Input, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUploader from 'react-images-upload';

import * as userActions from '../../actions/user.action';

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
    handleSubmit = () => {
        let data = new FormData();
        if (!this.props.user) {
            data.append('name', this.state.name)
            data.append('email', this.state.email)
            data.append('gender', this.state.gender)
            data.append('picture', this.state.picture)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                    //'content-type': false
                }
            }
            for (let v of data.values()) {
                console.log(v);
            }
            // let { name, email, gender, picture } = this.state;
            //let img = picture[0];
            this.props.addUser(data, config);
        }
        else {
            let user = this.props.user;
            user.name = this.state.name;
            user.email = this.state.email;
            user.gender = this.state.gender;
            this.props.editUser(user.id, user)
        }
        this.closeModal();
    }
    closeModal = () => {
        this.setState({ name: '', email: '', gender: '', id: 0 })
        this.props.toggle();
    }
    componentWillReceiveProps = (props) => {
        if (props.user) {
            this.setState({ id: props.user.id, name: props.user.name, email: props.user.email, gender: props.user.gender })
        }
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
                <Form style={{ margin: '20px' }}>
                    <FormGroup>
                        <Input type='text' name='name' placeholder='Name' defaultValue={this.state.name} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type='email' name='email' placeholder='Email' defaultValue={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    Gender:
                    <FormGroup check>
                        <Input type='radio' name='gender' value="Male" onChange={this.handleChange} defaultChecked={this.state.gender === "Male"} />
                        Male
                    </FormGroup>
                    <FormGroup check>
                        <Input type='radio' name='gender' value="Female" onChange={this.handleChange} defaultChecked={this.state.gender === "Female"} />
                        Female
                    </FormGroup>
                    {
                        this.props.user ? null :
                            this.state.displayPic === '' ? < ImageUploader
                                withIcon={true}
                                name='picture'
                                buttonText='Choose images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                singleImage={true} accept={"image/*"}
                                maxFileSize={5242880} /> :
                                <img src={this.state.displayPic} alt='img' height='150px' width='150px' />
                    }
                    <ModalFooter>
                        {this.props.user ? <Button className='update' onClick={this.handleSubmit} color='info'>Update</Button> :
                            <Button className='submit' onClick={this.handleSubmit} color='info'>Submit</Button>}
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