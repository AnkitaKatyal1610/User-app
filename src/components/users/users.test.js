import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Users } from "./users";

configure({ adapter: new Adapter() });

describe('Tests for <Users/>', () => {
    let wrapper, props = {
        getUsers: jest.fn(),
        users: [{
            isDeleted: false,
            id: 6,
            name: "test",
            email: "test@test.com",
            gender: "Female",
            updatedAt: "2019-03-12T06:45:16.763Z",
            createdAt: "2019-03-12T06:45:16.763Z"
        }],
        deleteUser: jest.fn()
    };
    beforeEach(() => {
        wrapper = shallow(<Users {...props} />)
    })
    it('has a table with data of users', () => {
        let table = wrapper.find('Table');
        expect(table.length).toEqual(1);
    })
    it('fetches user data when component mounts', () => {
        expect(props.getUsers).toHaveBeenCalled();
    })
    it('has a button to add new user', () => {
        let button = wrapper.find('Button.add');
        expect(button.length).toEqual(1);
    })
    it('calls onClick function when add user button is clicked', () => {
        let spy = jest.spyOn(wrapper.instance(), 'toggle')
        let button = wrapper.find('Button.add');
        button.simulate('click');
        expect(spy).toHaveBeenCalled();
    })
    it('calls onClick function when edit button is clicked and sets the user', () => {
        let spy = jest.spyOn(wrapper.instance(), 'toggle')
        let button = wrapper.find('Button.edit');
        button.simulate('click');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.state().user).toEqual({
            isDeleted: false, id: 6, name: "test", email: "test@test.com", gender: "Female", updatedAt: "2019-03-12T06:45:16.763Z",
            createdAt: "2019-03-12T06:45:16.763Z"
        })
    })
    it('calls delete user action when delete button is clicked', () => {
        let button = wrapper.find('Button.delete');
        button.simulate('click');
        expect(props.deleteUser).toHaveBeenCalled();
    })
})