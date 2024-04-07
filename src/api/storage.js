import request from './request'

export const listStorage = () => {
    return request({
        url:'/admin/storage/list',
    })
}

export const getStorage = (data) => {
    return request({
        url:'/admin/storage/get',
        method:'post',
        data
    })
}

export const mountStorage = (data) => {
    return request({
        url:'/admin/storage/mount',
        method:'post',
        data
    })
}

export const updateStorage = (data) => {
    return request({
        url:'/admin/storage/update',
        method:'post',
        data
    })
}

export const switchStorage = (data) => {
    return request({
        url:'/admin/storage/switch',
        method:'post',
        data
    })
}

export const deleteStorage = (data) => {
    return request({
        url:'/admin/storage/delete',
        method:'post',
        data
    })
}

export const listEngineName = (data) => {
    return request({
        url:'/admin/storage/listname',
    })
}

export const listEngineForm = (data) => {
    return request({
        url:'/admin/storage/listform',
    })
}