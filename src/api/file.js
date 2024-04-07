import request from './request'

export const getFlist = (data) => {
    return request({
        url:'/file/list',
        method:'post',
        data,
        rawReturn: true
    })
}

export const getFinfo = (data) => {
    return request({
        url:'/file/get',
        method:'post',
        data,
        rawReturn: true
    })
}

export const subdir = (data) => {
    return request({
        url:'/file/subdir',
        method:'post',
        data
    })
}
