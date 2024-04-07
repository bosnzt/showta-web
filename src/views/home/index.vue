<template>
  <el-card class="box-card">
    <div>
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :xs="24" :sm="8" class="user-item">
              <div class="user-item-label">{{$t('home.lbUsername')}}：</div>
              <div class="user-item-value">{{user.username}}</div>
            </el-col>
            <el-col :xs="24" :sm="16" class="user-item">
              <div class="user-item-label">{{$t('home.lbRole')}}：</div>
              <div class="user-item-value">
                <el-tag v-if="user.role==1">{{$t('home.tagAdmin')}}</el-tag>
                <el-tag v-else-if="user.role==3" type="success">{{$t('home.tagUser')}}</el-tag>
                <el-tag v-else-if="user.role==9" type="info">{{$t('home.tagGuest')}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :xs="24" :sm="8" class="user-item">
              <div class="user-item-label">{{$t('home.lbLoginIp')}}：</div>
              <div class="user-item-value">{{user.login_ip}}</div>
            </el-col>
            <el-col :xs="24" :sm="16" class="user-item">
              <div class="user-item-label">{{$t('home.lbLoginTime')}}：</div>
              <div class="user-item-value">{{dateFormat(user.login_time)}}</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :xs="24" :sm="8" class="user-item">
              <el-button type="primary" plain class="user-pwd" @click="handleDialog">{{$t('home.btnChangePwd')}}</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {aboutUser, resetPwd} from '@/api/user'
import {dateFormat} from '@/utils/date'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const user = ref({
  username: '',
  role: 0,
  login_ip: '',
  login_time: '',
})

onBeforeMount( async ()=> {
  const {code, data} = await aboutUser()
  if (code === 0) {
    user.value = data
  }
})

const handleDialog = () => {
  ElMessageBox.prompt(i18n.t('home.tipChangePwd'), i18n.t('home.btnChangePwd'), {
    confirmButtonText: i18n.t('btn.confirm'),
    cancelButtonText: i18n.t('btn.cancel'),
    inputPattern:/.+/,
    inputErrorMessage: i18n.t('home.prPassword'),
  })
    .then(({ value }) => {
      resetPwd({password:value}).then(() => {
        ElMessage.success(i18n.t('msg.modifySuccess'))
      })
    })
    .catch(() => {})
}

</script>

<style lang="scss" scoped>
.user-item {
  display: flex;
  font-size: 0.875rem;
}

.user-item-label {
  color: #909399;
  line-height: 2rem;
}

.user-item-value {
  line-height: 2rem;
}

.user-pwd {
  margin-top: 2rem;
}
</style>
