<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-button type="primary" size="large" plain @click="handleDialogValue()" >{{$t('btn.add')}}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%"
      :header-cell-style="{color:'#676f77'}"
    >
      <el-table-column prop="username" :label="$t('table.username')" width="180" />
      <el-table-column :label="$t('table.role')" width="180">
        <template #default="scope">
          <el-tag v-if="scope.row.role==1" >{{$t('home.tagAdmin')}}</el-tag>
          <el-tag v-else-if="scope.row.role==3" type="success">{{$t('home.tagUser')}}</el-tag>
          <el-tag v-else-if="scope.row.role==9" type="info">{{$t('home.tagGuest')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" width="180">
        <template #default="scope">
          <el-switch
            size="large"
            v-model="scope.row.enable"
            inline-prompt
            :active-text="$t('user.swEnabled')"
            :inactive-text="$t('user.swDisabled')"
            :disabled="scope.row.username=='admin'"
            @change="changeState(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="enable" :label="$t('table.updateTime')" width="180">
        <template #default="scope">
          {{dateFormat(scope.row.modified)}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.operation')">
        <template #default="scope">
          <el-button type="primary" size="large" plain  @click="handleDialogValue(scope.row)">{{$t('btn.edit')}}</el-button>
          <el-button v-if="scope.row.role===3" type="danger" size="large" plain @click="delUser(scope.row)">{{$t('btn.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <Dialog v-model="dialogVisible" v-if="dialogVisible" @initUserList="initGetUsersList" :userData="userData" />
</template>

<script setup>
import {Edit, Delete} from '@element-plus/icons-vue'
import {ref, onBeforeMount} from 'vue'
import {listUser, enableUser, deleteUser} from '@/api/user'
import { ElMessage, ElMessageBox  } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './components/dialog.vue'
import {isNull} from '@/utils/filters'
import {dateFormat} from '@/utils/date'

const i18n = useI18n()
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize:10
})
const total = ref(0)
const tableData = ref([])
const dialogVisible = ref(false)
const userData = ref({})

const initGetUsersList = async () => {
  const res = await listUser(queryForm.value)
  tableData.value = res.users
  total.value = res.total
}

onBeforeMount(() => {
  initGetUsersList()
})

const changeState = async (row) => {
  let action = row.enable === true ? i18n.t('user.msgEnable') : i18n.t('user.msgDisable');
  ElMessageBox.confirm(
    i18n.t('user.msgSwitch').replace('#action', action).replace('#user', row.username),
    i18n.t('dialog.warn'),
    {
      confirmButtonText: i18n.t('btn.confirm'),
      cancelButtonText: i18n.t('btn.cancel'),
      type: 'warning',
    }
  )
  .then( async () => {
    await enableUser(row)
    ElMessage.success(i18n.t('msg.updateSuccess'))
  })
  .catch(() => {
    row.enable = row.enable === false ? true : false
  })
}

const handleDialogValue = (row) => {
  if (isNull(row)) {
    userData.value = {}
  } else {
    userData.value = row
  }
  
  dialogVisible.value = true
}

const delUser = (row) => {
  ElMessageBox.confirm(
    i18n.t('dialog.delConfirmTitle').replace('#replace', row.username),
    i18n.t('dialog.warn'),
    {
      confirmButtonText: i18n.t('btn.confirm'),
      cancelButtonText: i18n.t('btn.cancel'),
      type: 'warning',
    }
  )
  .then( async () => {
    await deleteUser(row)
    ElMessage.success(i18n.t('msg.deleteSuccess'))
    initGetUsersList()
  })
  .catch(() => {
  })
}

</script>

<style lang="scss" scoped>
.header{
  padding-bottom: 16px;
  box-sizing: border-box;
}

:deep(.el-pagination) {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
