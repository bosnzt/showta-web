<template>
  <div>
    <el-row :gutter="0" class="option">
      <el-button size="large" type="primary" plain @click="goEdit()">{{$t('btn.add')}}</el-button>
    </el-row>
  </div>
  <div class="folder">
    <el-table :data="folderData" stripe style="width: 100%" 
      :header-cell-style="{color:'#676f77'}"
    >
      <el-table-column prop="folder" :label="$t('table.dirPath')" min-width="160" />
      <el-table-column :label="$t('table.readWrite')" width="180">
        <template #default="scope">
          <el-tag v-if="scope.row.write" >{{$t('folder.tagWrite')}}</el-tag>
          <el-tag v-else type="info">{{$t('folder.tagRead')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="password" :label="$t('table.accessPwd')" width="180" />
      <el-table-column prop="notice" :label="$t('table.announcement')" width="180">
        <template #default="scope">
          <el-tag v-if="scope.row.topmd" type="success" class="notice-gap">
            {{$t('folder.tagTop')}}
          </el-tag>
          <el-tag v-if="scope.row.readme" type="success">{{$t('folder.tagBottom')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.operation')" width="200">
        <template #default="scope">
          <el-button size="large" type="primary" plain @click="goEdit(scope.row.id)">{{$t('btn.edit')}}</el-button>
          <el-button size="large" type="danger" plain @click="delSetting(scope.row)">{{$t('btn.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import {useRouter} from 'vue-router'
import {listSetting, deleteSetting} from '@/api/folder'
import { ElMessage, ElMessageBox  } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const router = useRouter()
const folderData = ref([])

const initSetting = async() => {
  folderData.value = await listSetting()
}

onBeforeMount(() => {
  initSetting()
})

const goEdit = (id) => {
  let url = id ? '/@admin/folder/edit/'+id : '/@admin/folder/add'
  router.replace(url)
}

const delSetting = (row) => {
  ElMessageBox.confirm(
    i18n.t('dialog.delConfirmTitle').replace('#replace', row.folder),
    i18n.t('dialog.warn'),
    {
      confirmButtonText: i18n.t('btn.confirm'),
      cancelButtonText: i18n.t('btn.cancel'),
      type: 'warning',
    }
  )
  .then( async () => {
    await deleteSetting({id:row.id})
    ElMessage.success(i18n.t('msg.deleteSuccess'))
    initSetting()
  })
  .catch(() => {})
}
</script>

<style lang="scss" scoped>
.option {
  margin-bottom: 2rem;
}

.notice-gap {
  margin-right: 1px;
}
</style>
