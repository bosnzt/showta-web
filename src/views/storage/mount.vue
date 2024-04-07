<template>
  <div>
    <el-form 
      ref="formRef" 
      :model="form" 
      label-width="130px" 
      :validate-on-rule-change="false"
    >
      <el-form-item :label="$t('storage.lbEngineType')" prop="engine"
        :rules="{required: true, message: $t('storage.prEngineType'), trigger: 'blur'}"
      >
        <el-select
          v-model="form.engine"
          filterable
          clearable
          :placeholder="$t('storage.phEngineType')"
          @change="changeEngine"
          style="display:inline-block"
        >
          <el-option
            v-for="(item,key) of options"
            :key="key"
            :label="$t(`engine.${key}`)"
            :value="key"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('storage.lbMountPath')" prop="mount_path"
        :rules="{required: true, message: $t('storage.prMountPath'), trigger: 'blur'}"
      >
        <el-input clearable v-model="form.mount_path" />
        <div class="tip">{{$t('storage.tipMountPath')}}/ui</div>
      </el-form-item>
      <el-form-item v-for="(item, index) of form.template" 
        :label="$t(`${form.engine}.lable_${item.name}`)" 
        :prop="'template.' + index + '.value'"
        :rules="getRules(item)"
      >
        <el-input v-if="item.etype=='input'" clearable v-model="item.value" />
        <el-select 
          v-else-if="item.etype=='select'" 
          v-model="item.value"
          :placeholder="$t('storage.prChoose')"
        >
          <el-option
            v-for="it in item.options.split(',')"
            :key="it"
            :label="$t(`${form.engine}.lable_options_${it}`)"
            :value="it"
          />
        </el-select>
        <el-input v-else-if="item.etype=='textarea'" type="textarea" v-model="item.value" :rows="4" />
        <div v-if="item.tip" class="tip">{{$t(`${form.engine}.tip_${item.name}`)}}</div>
      </el-form-item>
      <el-form-item :label="$t('storage.lbRemark')">
        <el-input
          v-model="form.remark"
          :autosize="{ minRows: 2, maxRows: 10 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="onMountStorage">
          {{isEdit?$t('btn.modify'):$t('btn.add')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import {mountStorage, getStorage, updateStorage, listEngineForm} from '@/api/storage'
import {useRoute, useRouter} from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage} from 'element-plus'

const i18n = useI18n()
const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const form = ref({
  mount_path: '',
  engine: '',
  extra: '',
  template: [],
  remark: '',
})

const options = ref({})
const isEdit = ref(false)
let dataExtra = {}

onBeforeMount( async () => {
  options.value = await listEngineForm()
  if (route.params.id) {
    isEdit.value = true
    form.value = await getStorage({id:parseInt(route.params.id)})
    dataExtra[form.value.engine] = JSON.parse(form.value.extra)
    changeEngine(form.value.engine)
  }
})

const onMountStorage = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      let extra = {}
      for (const val of form.value.template) {
        extra[val.name] = val.value
      }

      form.value.extra = JSON.stringify(extra)
      if (isEdit.value) {
        await updateStorage(form.value)
        ElMessage.success(i18n.t('msg.modifySuccess'))
      } else {
        await mountStorage(form.value)
        ElMessage.success(i18n.t('msg.addSuccess'))
      }

      router.replace('/@admin/storage')
    } else {
    }
  })
}

const changeEngine = (engine) => {
  formRef.value.clearValidate()
  form.value.extra = ''
  form.value.template = []
  let curOptions = options.value[engine]
  if (!curOptions) {
    return
  }

  let curData = dataExtra[engine] || {}
  for (const val of curOptions.extra) {
    val.value = curData[val.name] || val.dvalue || ''
    form.value.template.push(val)
  }
}

const getRules = (data) => {
  if (!data.required) {
    return {} 
  }

  let message = data.etype==='select' ? i18n.t('storage.ruleMustChoose') : i18n.t('storage.ruleMustRender') 
  message += i18n.t(`${form.value.engine}.lable_${data.name}`)
  return {required: true, message: message, trigger: 'blur'}
}

</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  color: $formLabelColor;
}

.engine el-radio-button {
  background-color: gray;
}

:deep(.el-input-group__prepend) {
  padding: 0 0.3rem;
}

.tip {
  width: 100%;
  color: $formTipColor;
  line-height: 1.5rem;
  font-size: 0.8rem;
}
</style>
