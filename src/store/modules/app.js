import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {userLogin} from '@/api/user'
import {getPreference} from '@/api/preference'
import router from '@/router'

export const useAppStore = defineStore('app', () => {
    const token = ref('')
    const lang = ref('zh')
    const siderType = ref(true)
    const currentMenu = ref('')
    const preference = ref({})
    const accessPwd = ref('')

    function gettersToken() {
        return token.value || localStorage.getItem('token') || ''
    }

    function login(userInfo) {
        return new Promise((resolve, reject) => {
            userLogin(userInfo)
              .then((res) => {
                setToken(res.token)
                router.replace('/@admin')
                resolve()
              })
              .catch((err) => {
                reject(err)
              })
        })
    }

    function logout() {
        setToken('')
        // localStorage.clear()
        router.replace('/@admin/login')
    }

    function setToken(ntoken) {
        token.value = ntoken
        localStorage.setItem('token', ntoken)
    }

    function changeLang(nlang) {
        lang.value = nlang
        localStorage.setItem('lang', nlang)
    }

    function changeSiderType() {
        siderType.value = !siderType.value
        localStorage.setItem('sider', siderType.value)
    }

    function loadSiderType() {
        let value = localStorage.getItem('sider')
        if (value === null) {
            siderType.value = (window.innerWidth < 600)?false:true
        } else {
            siderType.value = (value==='false')?false:true
        }
    }

    function gettersDefaultMenu() {
        return currentMenu.value || '/@admin/user'
    }

    function changeMenu(path) {
        if (currentMenu.value != path && path.startsWith("/@admin")) {
            currentMenu.value = path
        }
    }

    function updatePreference() {
        if (Object.keys(preference.value).length !== 0) {
            return
        }

        return new Promise((resolve, reject) => {
            getPreference()
              .then((res) => {
                preference.value = res
                resolve()
              })
              .catch((err) => {
                reject(err)
              })
        })
    }

    function setAccessPwd(pwd) {
        accessPwd.value = pwd
        localStorage.setItem('access_pwd', pwd)
    }

    function gettersAccessPwd() {
        return accessPwd.value || localStorage.getItem('access_pwd') || ''
    }

    return {
        siderType, 
        gettersToken, 
        login, 
        logout, 
        changeLang, 
        changeSiderType,
        loadSiderType,
        gettersDefaultMenu,
        changeMenu,
        preference,
        updatePreference,
        setAccessPwd,
        gettersAccessPwd,
    }
})