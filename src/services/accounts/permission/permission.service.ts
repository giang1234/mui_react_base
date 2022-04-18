import axios from '../../abstract.service';

export const GetListPermissions = (params: any): any => {
    return axios.get(`permissions`, {
        params: params
    }).then(res => res.data).catch(err => {
        return Promise.reject(err);
    });
}

export const GetPermissionsById = (id: string): any => {
    return axios.get(`permission/${id}`).then(res => res).catch(err => {
        return Promise.reject(err);
    });
}

export const GetListPermissionsByRole = (id: string): any => {
    return axios.get(`roles/${id}/permissions`).then(res => res).catch(err => {
        return Promise.reject(err);
    })
}

export const AttachPermisionToRole = (params: any): any => {
    return axios.get('permissions/attach').then(res => res).catch(err => {
        return Promise.reject(err);
    });
}