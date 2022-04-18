import axios from '../../abstract.service';

export const GetListUser = (params: any): any => axios.get('users', params).then(res => res.data);
