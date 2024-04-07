import request from './request'

export const listSetting = () => {
    return request({
        url:'/admin/folder/list_setting',
    })
}

export const getSetting = (data) => {
    return request({
        url:'/admin/folder/get_setting',
        method:'post',
        data
    })
}

export const addSetting = (data) => {
    return request({
        url:'/admin/folder/add_setting',
        method:'post',
        data
    })
}

export const updateSetting = (data) => {
    return request({
        url:'/admin/folder/update_setting',
        method:'post',
        data
    })
}

export const deleteSetting = (data) => {
    return request({
        url:'/admin/folder/delete_setting',
        method:'post',
        data
    })
}