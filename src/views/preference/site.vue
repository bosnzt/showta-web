<template>
  <el-form :model="form" label-width="131px" >
    <el-form-item :label="$t('site.lbTitle')">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item :label="$t('site.lbLogo')">
      <el-input v-model="form.logo" />
    </el-form-item>
    <el-form-item :label="$t('site.lbFavicon')">
      <el-input v-model="form.favicon" />
    </el-form-item>
    <el-form-item :label="$t('site.lbDomain')" prop="domain">
      <el-input v-model="form.domain" />
      <div class="tip">{{$t('site.tipDomain')}}</div>
    </el-form-item>
    <el-form-item :label="$t('site.lbNotice')">
      <el-input v-model="form.notice" type="textarea" :autosize="{minRows:2, maxRows:10}" />
      <div class="tip">{{$t('site.tipNotice')}}</div>
    </el-form-item>
    <el-form-item :label="$t('site.lbSign')">
      <el-switch
        v-model="form.global_sign"
        inline-prompt
        :active-text="$t('site.swYes')"
        :inactive-text="$t('site.swNo')"
      />
    </el-form-item>
    <el-form-item :label="$t('site.lbSignExpire')">
      <el-input-number v-model="form.sign_expiration" :min="0" :max="999999" style="margin-right:0.25rem" />
      {{$t('site.lbHour')}}
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{$t('btn.save')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue'
import {getSite, updateSite} from '@/api/preference'
import { ElMessage} from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const form = ref({
  title: '',
  logo: '',
  favicon: '',
  domain: '',
  notice: '',
  global_sign: true,
  sign_expiration: 0,
})

onBeforeMount(async()=> {
  let resp = await getSite()
  for (const element of resp.data) {
    if (element.key === 'site_title') {
      form.value.title = element.value
    } else if (element.key === 'site_logo') {
      form.value.logo = element.value
    } else if (element.key === 'site_favicon') {
      form.value.favicon = element.value
    } else if (element.key === 'site_domain') {
      form.value.domain = element.value
    } else if (element.key === 'site_notice') {
      form.value.notice = element.value
    } else if (element.key === 'global_sign') {
      form.value.global_sign = element.value==='true'?true:false
    } else if (element.key === 'sign_expiration') {
      form.value.sign_expiration = Number(element.value)
    }
  }
})

const validateDomain = () => {
  if (form.value.domain === '') {
    return
  }

  const regex = /^(https?:\/\/)/
  if (!regex.test(form.value.domain)) {
    form.value.domain = 'http://'+form.value.domain
  }

  form.value.domain = form.value.domain.replace(/\/+$/, '')
} 

const onSubmit = async () => {
  validateDomain()
  await updateSite(form.value)
  ElMessage.success(i18n.t('msg.saveSuccess'))
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  color: $formLabelColor;
}

.tip {
  width: 100%;
  color: $formTipColor;
  line-height: 1.5rem;
  font-size: 0.8rem;
}
</style>
