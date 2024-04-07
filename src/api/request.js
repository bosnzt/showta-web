import axios from 'axios'
import { ElMessage } from 'element-plus'
import {useAppStore} from '@/store/modules/app'
import {i18n} from '@/i18n'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('token') || ''
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use((response)=>{
    const appStore = useAppStore()
    let {code, msg, data} = response.data
    if (code === 401) {
        appStore.logout()
        if (msg==='errTokenExpired' || msg==='errTokenInvalid') {
            msg = i18n.global.t(`resp.${msg}`)
        }

        if (msg !== 'errMustLogin') {
            ElMessage.error(msg)
        }

        return
    }

    if (response.config.rawReturn) {
        return response.data
    }
    
    if (code === 0) {
        return data
    } else {
        if (msg==='errAuthAccount') {
            msg = i18n.global.t(`resp.${msg}`)
        }

        ElMessage.error(msg)
        return Promise.reject(new Error(msg))
    }
}, error => {
    error.response && error.response.statusText 
        && ElMessage.error(error.response.statusText)
    return Promise.reject(new Error(error.response.data))
})

export default service