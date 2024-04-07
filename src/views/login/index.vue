<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar-right">
        <el-dropdown @command="handleCommand">
          <svg-icon icon="language"></svg-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item,key) of langMap" :command="key" :disabled="currentLanguage === key">
                {{item}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <el-card class="box-card">
        <div class="main-card">
          <div class="header">
            <img :src="getImageUrl()" />
            <h2>{{$t('login.title')}}ShowTa</h2>
          </div>
          <el-form ref="formRef" :model="form" size='large' class="form" :rules="rules">
            <el-form-item prop="username">
              <el-input 
                v-model="form.username" 
                :placeholder="$t('login.phUsername')" 
                :prefix-icon="User" 
                autofocus
                :validate-event="false"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input 
                type="password" 
                v-model="form.password" 
                :placeholder="$t('login.phPassword')" 
                :prefix-icon="Lock"
                show-password
                :validate-event="false"
                />
            </el-form-item>

            <div class="forget-pop">
              <a href="https://www.showta.cc/intro/user.html#忘记登录密码" target="_blank" class="forget-tips">{{$t('login.tipForgot')}}</a>
            </div>

            <el-form-item>
              <el-button class="clear-btn" color="#d8f3f6" @click="resetForm">{{$t('login.btnClear')}}</el-button>
              <el-button class="login-btn" color="#cee7fe" type="primary" @click="handleLogin">{{$t('login.btnLogin')}}</el-button>
            </el-form-item>
          </el-form>

          <div>
            <el-button class="guest-btn" color="#e4defc" type="primary" size='large' @click="handleLoginGuest" >{{$t('login.btnView')}}</el-button>
          </div>

        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, computed} from 'vue'
import {useAppStore} from '@/store/modules/app'
import { User, Lock } from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import { useI18n } from 'vue-i18n'
import {langMap} from '@/i18n'

const i18n = useI18n()
const router = useRouter()
const appStore = useAppStore()

const currentLanguage = computed(() => {
  return i18n.locale.value
})

const handleCommand = (val) => {
  i18n.locale.value = val
  appStore.changeLang(val)
}

const getImageUrl = () => {
  if (appStore.preference.site_logo) {
    return appStore.preference.site_logo
  }

  return new URL('../../assets/logo.png', import.meta.url).href
}

onBeforeMount(async ()=>{
  await appStore.updatePreference()
})

const form = ref({
    username: '',
    password: '',
})

const rules = ref({
  username: [
    { 
      required: true, 
      message: i18n.t('login.ruleUsername'), 
    }
  ],
  password: [
    { 
      required: true, 
      message: i18n.t('login.rulePassword'), 
    }
  ]
})

const formRef = ref(null)
const resetForm = () => {
  formRef.value.resetFields()
}

const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      appStore.login(form.value)
    } else {
      return false
    }
  })
}

const handleLoginGuest = () => {
  router.replace("/")
}

</script>

<style lang="scss" scoped>
.container {
  background: url("@/assets/login_bg.png") no-repeat center right;
  
}

.navbar {
  display: flex;
  justify-content: flex-end;

  .navbar-right {
    margin: 2rem 2rem 0 0;
    cursor: pointer;

    svg {
      width: 1.5em;
      height: 1.5em;
    }
  }
}

.content {
  display: flex;
  justify-content:center;
  align-items:center;
  height: 93vh;
}

.box-card {
  width: 364px;
  border-radius: $borderRadius;
}

.main-card {
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: space-between;
  padding: 24px;
  padding-top: 0;
}

.header {
  display: flex;
  align-items:center;
  justify-content:space-around;
  margin-bottom: 15px;
}

.header img {
  margin-right: 8px;
  width: 3rem;
}

.header h2 {
  font-size: 1.4rem;
  color: #0192FD;
}

.form {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
}

:deep(.el-input__wrapper) {
  border-radius: $borderRadius;
  background-color: #f1f3f5;
  font-size: 1rem;
}

:deep(.el-input__inner) {
  color: #11181c;
}

.clear-btn, .login-btn {
  width: 48%;
  font-size: 1rem;
  border: 0;
  border-radius: $borderRadius;
}

.clear-btn {
  color: #0D7793;

}

.login-btn {
  color: #016BDB;
}

.forget-pop {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.forget-tips {
  cursor: pointer;
  color: #80878A;
  font-size: 14px;
}

.guest-btn {
  width: 300px;
  font-size: 1rem;
  color: #5647B0;
  border: 0;
  border-radius: $borderRadius;
}


</style>
