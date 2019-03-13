import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as userActions from '../../actions/user.action';
import UserModal from './userModal';
import { path } from '../../constants/path';
export class Users extends Component {

    state = {
        showModal: false,
        user: undefined
    }

    componentWillMount() {
        this.props.getUsers();
    }

    toggle = (user) => {
        this.setState(prevState => ({ showModal: !prevState.showModal, user }))
    }
    handleDelete = (id) => {
        this.props.deleteUser(id);
    }
    render() {
        return (
            <div style={{ margin: '20px' }}>
                <Button onClick={() => this.toggle(undefined)} color='info' className='add'>Add User</Button>
                <UserModal isOpen={this.state.showModal} toggle={this.toggle} user={this.state.user} />
                <Table dark style={{ textAlign: 'center', margin: '15px' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.users.map((user, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><img src={path + user.picture} alt='avatar' height='50px' width='50px' /></td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>
                                        <Button onClick={() => this.toggle(user)} color='info' className='edit'>Edit</Button>{" "}
                                        <Button onClick={() => this.handleDelete(user.id)} color='danger' className='delete'>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapState = (state) => {
    const { users } = state.user
    return {
        users
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUsers: bindActionCreators(userActions.getUsersAction, dispatch),
        deleteUser: bindActionCreators(userActions.deleteUserAction, dispatch)
    }
}
export default connect(mapState, mapDispatch)(Users);