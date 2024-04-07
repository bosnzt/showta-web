import request from './request'

export const getPreference = () => {
    return request({
        url:'/preference',
    })
}

export const getDisplay = () => {
    return request({
        url:'/admin/preference/display_get',
    })
}

export const updateDisplay = (data) => {
    return request({
        url:'/admin/preference/display_update',
        method:'post',
        data
    })
}

export const getSite = () => {
    return request({
        url:'/admin/preference/site_get',
    })
}

export const updateSite = (data) => {
    return request({
        url:'/admin/preference/site_update',
        method:'post',
        data
    })
}