import request from './request'

export const userLogin = (data) => {
    return request({
        url:'/admin/login',
        method:'POST',
        data
    })
}

export const aboutUser = () => {
    return request({
        url:'/admin/user/about',
        rawReturn: true
    })
}

export const resetPwd = (data) => {
    return request({
        url:'/admin/user/reset_pwd',
        method:'post',
        data
    })
}

export const listUser = (data) => {
    return request({
        url:'/admin/user/list',
        method:'post',
        data
    })
}

export const enableUser = (data) => {
    return request({
        url:`/admin/user/enable`,
        method:'post',
        data
    }) 
}

export const addUser = (data) => {
    return request({
        url:'/admin/user/add',
        method:'post',
        data,
        rawReturn: true
    })
}

export const editUser = (data) => {
    return request({
        url:`/admin/user/update`,
        method:'post',
        data,
        rawReturn: true
    })
}

export const deleteUser = (data) => {
    return request({
        url:`/admin/user/delete`,
        method:'post',
        data
    })
}