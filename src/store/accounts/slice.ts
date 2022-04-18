import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    roles: [],
    permissions: [],
    page: 1,
    pageSize: 10,
    totalPage: 0,
    rowCount: 0,
    sortColumn: 'id',
    sortType: 'DESC'
}
export default createSlice({
    name: 'account',
    initialState,
    reducers: {
        listRoleSuccess: (state, action) => ({
            ...state,
            roles: action.payload.result.data,
            page: action.payload.result.meta.pagination.current_page,
            pageSize: action.payload.result.meta.pagination.per_page,
            rowCount: action.payload.result.meta.pagination.total,
            totalPage: action.payload.result.meta.pagination.total_pages
        }),
        GetRoleByIdSuccess: (state, action) => ({
            ...state,
            roles: action.payload.result.data
        }),
        listUserSuccess: (state, action) => ({
            ...state,
            users: action.payload.result.data,
            page: action.payload.result.meta.pagination.current_page,
            pageSize: action.payload.result.meta.pagination.per_page,
            rowCount: action.payload.result.meta.pagination.total,
            totalPage: action.payload.result.meta.pagination.total_pages
        }),
        listPermissionSuccess: (state, action) => ({
            ...state,
            permissions: action.payload.result.data,
            page: action.payload.result.meta.pagination.current_page,
            pageSize: action.payload.result.meta.pagination.per_page,
            rowCount: action.payload.result.meta.pagination.total,
            totalPage: action.payload.result.meta.pagination.total_pages
        }),
        listPermissionsByRoleSuccess: (state, action) => ({
            ...state,
            permissions: action.payload.result.data
        }),
        // attachPermissionToRole: (state, action) => ({
        //     ...state,
        //     permissions: action.payload.result.data
        // })
    }
});
