<template>
  <div>
    <el-form :model="form" ref="formRef" :rules="rules" label-width="154px">
      <el-form-item :label="$t('table.dirPath')" prop="folder">
        <el-button type="primary" plain @click="handleDialogValue">{{$t('folder.btnSelectDir')}}</el-button>
        <el-input style="margin-top:0.5rem;" v-model="form.folder" :placeholder="$t('folder.phSelectDir')" />
      </el-form-item>
      <el-form-item :label="$t('table.readWrite')">
          <el-switch
            v-model="form.write"
            :active-text="$t('folder.tagWrite')"
            :inactive-text="$t('folder.tagRead')"
          />
      </el-form-item>
      <el-form-item :label="$t('table.accessPwd')">
        <el-input v-model="form.password" />
        <el-switch v-model="form.apply_sub" /><span class="apply-sub">{{$t('table.tipApplySub')}}</span>
      </el-form-item>
      <el-form-item :label="$t('folder.lbTopAnnouncement')">
        <el-input
          v-model="form.topmd"
          :autosize="{ minRows: 3, maxRows: 10 }"
          type="textarea"
          :placeholder="$t('folder.phAnnouncement')"
        />
        <div class="tip">{{$t('folder.tipTopAnnouncement')}}</div>
      </el-form-item>
      <el-form-item :label="$t('folder.lbBottomAnnouncement')">
        <el-input
          v-model="form.readme"
          :autosize="{ minRows: 3, maxRows: 10 }"
          type="textarea"
          :placeholder="$t('folder.phAnnouncement')"
        />
        <div class="tip">{{$t('folder.tipBottomAnnouncement')}}</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="onEditSetting">
          {{isEdit?$t('btn.save'):$t('btn.add')}}
        </el-button>
      </el-form-item>
    </el-form>
    <Dialog v-model="dialogVisible" @selectPath="selectPath" v-if="dialogVisible" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage} from 'element-plus'
import {getSetting, addSetting, updateSetting} from '@/api/folder'
import Dialog from './components/dialog.vue'

const i18n = useI18n()
const router = useRouter()
const route = useRoute()
const form = ref({
  folder: '',
  write:false,
  password: '',
  apply_sub: false,
  topmd: '',
  readme: '',
})
const formRef = ref(null)
const isEdit = ref(false)
const rules = ref({
  folder:[
    { required: true, message: i18n.t('folder.ruleFolder'), trigger: 'blur' },
  ],
})
const dialogVisible = ref(false)

onBeforeMount( async () => {
  if (route.params.id) {
    isEdit.value = true
    form.value = await getSetting({id:parseInt(route.params.id)})
  }
})

const onEditSetting = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (isEdit.value) {
        await updateSetting(form.value)
        ElMessage.success(i18n.t('msg.modifySuccess'))
      } else {
        await addSetting(form.value)
        ElMessage.success(i18n.t('msg.addSuccess'))
      }

      router.replace('/@admin/folder')
    } else {
    }
  })
}

const handleDialogValue = () => {
  dialogVisible.value = true
}

const selectPath = (path) => {
  form.value.folder = path
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

.apply-sub {
  margin-left: 5px;
}
</style>
