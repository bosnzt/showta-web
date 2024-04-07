<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="$t(isEdit?'user.titleEditUser':'user.titleAddUser')"
    @close="handleClose"
    class="user-dialog"
  >
    <el-form ref="formRef" :model="form" size="large" label-width="70px" :rules="rules">
      <el-form-item :label="$t('home.lbUsername')" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item v-if="form.role!=9" :label="$t('user.lbPassword')" prop="password" >
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item :label="$t('user.lbEnable')" prop="enable">
        <el-switch
          v-model="form.enable"
          inline-prompt
          :active-text="$t('user.swYes')"
          :inactive-text="$t('user.swNo')"
        />
      </el-form-item>
      <el-form-item :label="$t('user.lbPerm')" prop="perm">
        <div v-for="item of permList">
          <el-checkbox class="perm-box" :label="$t(`user.${item.name}`)" :checked="isPermChecked(item.id)" 
            :disabled="isPermDisabled()" @change="checked=>changePerm(checked, item.id)" />
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="handleConfirm">
          {{$t('btn.confirm')}}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue'
import {addUser, editUser} from '@/api/user'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const i18n = useI18n()
const isEdit = ref(false)
const props = defineProps({
  userData: {
    type: Object,
    default: () => {}
  },
  dialogVisible: {
    type: Boolean
  }
})

const formRef = ref(null)
const form = ref({
  username: '',
  password: '',
  role: 3,
  enable: true,
  perm: 0,
})

const permList = ref([
  {name:'permFileCreate', id:1},
  {name:'permFileDelete', id:2},
  {name:'permFileRename', id:3},
  {name:'permFileMove', id:4},
  {name:'permFileCopy', id:5},
  {name:'permWebdavRead', id:6},
])

const rules = ref({
  username: [
    { required: true, message: i18n.t('user.ruleUsername'), trigger: 'blur' },
  ],
})

onBeforeMount(()=>{
  if (props.userData.id) {
    isEdit.value = true
    form.value = props.userData
  }
})

const isPermDisabled = () => {
  return form.value.role === 1?true:false
}

const isPermChecked = (id) => {
  if (form.value.role === 1) {
    return true
  }

  return (form.value.perm & (1 << (id-1))) !== 0
}

const changePerm = (checked, id) => {
  if (checked) {  
    form.value.perm |= (1 << (id-1))
  } else {  
    form.value.perm &= ~(1 << (id-1))
  }
}

const emits = defineEmits(['update:modelValue', 'initUserList'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  formRef.value.validate( async (valid) => {
    if (valid) {
      let res
      if (isEdit.value) {
        res = await editUser(form.value)
      } else {
        res = await addUser(form.value)
      }

      if (res.code > 0) {
        ElMessage.error(res.msg)
      } else {
        ElMessage.success(i18n.t(isEdit.value?'msg.updateSuccess':'msg.addSuccess'))
      }

      emits('initUserList')
      handleClose()
    } else {
      return false;
    }
  });
}


</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  color: $formLabelColor;
}

.perm-box {
  width: 11rem;
}
</style>

<style lang="scss">
.user-dialog {
  border-radius: $borderRadius;
  width: 40%;
  min-width: 366px;
}

@media (min-width:600px) and (max-width:1000px) {
  .user-dialog {
    width: 58% !important;
  }
}

@media (max-width:600px) {
  .user-dialog {
    width: 98% !important;
  }
}
</style>
