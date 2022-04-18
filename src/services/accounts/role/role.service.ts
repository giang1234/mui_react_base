import axios from '../../abstract.service';

export const GetListRole = (params: any): any => {
    return axios.get(`roles`, {
        params: params
    }).then(res => res.data).catch(err => {
        return Promise.reject(err);
    });
}

export const GetRoleById = (id: string): any => {
    return axios.get(`role/${id}`).then(res => res).catch(err => {
        return Promise.reject(err);
    });
}