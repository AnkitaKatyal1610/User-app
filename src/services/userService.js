import { baseService } from './baseService';

export const getUsers = () => {
    return baseService.get(`/users`);
}

export const addUser = (user) => {
    return baseService.post(`/user`, user);
}

export const editUser = (id, user) => {
    return baseService.put(`/user/${id}`, user);
}

export const deleteUser = (id) => {
    return baseService.delete(`/user/${id}`);
}