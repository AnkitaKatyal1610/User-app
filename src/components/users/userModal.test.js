import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { UserModal } from './userModal';

configure({ adapter: new Adapter() });

describe('Tests for <UserModal/>', () => {
    it('is a Modal', () => {
        let wrapper = shallow(<UserModal />)
        let modal = wrapper.find('Modal');
        expect(modal.length).toEqual(1);
    })

    it('has a form with three input fields for adding or editing a user', () => {
        let wrapper = shallow(<UserModal />)
        let form = wrapper.find('Form');
        expect(form.length).toEqual(1);
        let inputs = wrapper.find('Input');
        expect(inputs.length).toEqual(4)
    })

    it('sets the values of user in state if props are received', () => {
        let user = {
            isDeleted: false,
            id: 6,
            name: "test",
            email: "test@test.com",
            gender: "Female",
            updatedAt: "2019-03-12T06:45:16.763Z",
            createdAt: "2019-03-12T06:45:16.763Z"
        }
        let wrapper = shallow(<UserModal />)
        wrapper.instance().componentWillReceiveProps({ user });
        let { name, email, gender } = wrapper.state();
        expect(name).toEqual('test')
        expect(email).toEqual('test@test.com')
        expect(gender).toEqual('Female')
    })

    it('changes values in state if user makes a change in the input value', () => {
        let wrapper = shallow(<UserModal />)
        let nameInput = wrapper.find('Input[name="name"]');
        nameInput.simulate('change', { target: { value: "test", name: 'name' } });
        let emailInput = wrapper.find('Input[name="email"]');
        emailInput.simulate('change', { target: { value: "test@test.com", name: 'email' } });
        let genderInput = wrapper.find('Input[value="Male"]');
        genderInput.simulate('change', { target: { value: "Male", name: 'gender' } });
        let { name, email, gender } = wrapper.state();
        expect(name).toBe("test");
        expect(email).toBe("test@test.com");
        expect(gender).toBe("Male");
    })

    it('can call add user action when submit button is clicked', () => {
        let props = {
            addUser: jest.fn(),
            toggle: jest.fn()
        }
        let wrapper = shallow(<UserModal {...props} />);
        let submitButton = wrapper.find('Button.submit');
        submitButton.simulate('click');
        expect(props.addUser).toHaveBeenCalled();
    })

    it('can call edit user action when update button is clicked', () => {
        let user = {
            isDeleted: false,
            id: 6,
            name: "test",
            email: "test@test.com",
            gender: "Female",
            updatedAt: "2019-03-12T06:45:16.763Z",
            createdAt: "2019-03-12T06:45:16.763Z"
        }
        let props = {
            editUser: jest.fn(),
            toggle: jest.fn(),
            user
        }
        let wrapper = shallow(<UserModal {...props} />);
        let updateButton = wrapper.find('Button.update');
        updateButton.simulate('click');
        expect(props.editUser).toHaveBeenCalled();
    })

    it('can toggle the modal when cancel button is clicked', () => {
        let props = { toggle: jest.fn() }
        let wrapper = shallow(<UserModal {...props} />);
        let cancelButton = wrapper.find('Button.cancel');
        cancelButton.simulate('click');
        expect(props.toggle).toHaveBeenCalled();
    })
})