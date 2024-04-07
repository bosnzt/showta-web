<template>
  <div>
    <el-row :gutter="0" class="option">
      <el-button size="large" type="primary" plain @click="goMount()">{{$t('btn.add')}}</el-button>
      <el-col :span="10" :offset="1">
        <el-select
          v-model="engine"
          filterable
          multiple
          size="large"
          :placeholder="$t('storage.phFilter')"
          style="width:100%"
          @change="onSelectEngine"
        >
          <el-option
            v-for="item in options"
            :key="item"
            :label="$t(`engine.${item}`)"
            :value="item"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="storage">
      <el-card class="box-card" v-for="(item,index) of storages" :key="item.id">
        <div class="panel-btn">
          <div class="panel-path">{{item.mount_path}}</div>
          <el-tag size="small" >{{$t(`engine.${item.engine}`)}}</el-tag>
        </div>

        <div class="panel-btn panel-status">
          <div v-if="item.status!='work'&&item.status!='disabled'" >
            {{$t('storage.lbStatus')}}: {{$t('storage.stateerror')}}
            <el-popover
              placement="top"
              title="Error"
              trigger="hover"
              popper-class="status-msg"
              :content="item.status"
            >
              <template #reference>
                <svg-icon class="status-err" icon="status-err">
                </svg-icon>
              </template>
            </el-popover>
          </div>
          <div v-else >{{$t('storage.lbStatus')}}: {{$t(`storage.state${item.status}`)}}</div>
        </div>
        <div class="panel-btn">
          <el-button size="large" type="primary" plain @click="goMount(item.id)">{{$t('btn.edit')}}</el-button>
          <el-button size="large" type="info" plain @click="onSwitchStorage(item)">{{$t(item.disabled==true?'btn.enable':'btn.disable')}}</el-button>
          <el-button size="large" type="danger" plain @click="delStorage(item)">{{$t('btn.delete')}}</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import {useRouter} from 'vue-router'
import { ElMessage, ElMessageBox  } from 'element-plus'
import {listEngineName, listStorage, switchStorage, deleteStorage} from '@/api/storage'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const router = useRouter()
const engine = ref('')
const options = ref([])
const storages = ref([])

let storageData = []
const initStorage = async () => {
  storageData = await listStorage()
  storages.value = storageData
}

onBeforeMount( async () => {
  let names = await listEngineName()
  if (names) {
    options.value = names
    initStorage()
  }
})

const goMount = (id) => {
  let url = id ? '/@admin/storage/edit/'+id : '/@admin/storage/mount'
  router.replace(url)
}

const onSwitchStorage = (row) => {
  let action = row.disabled?i18n.t('dialog.actEnable'):i18n.t('dialog.actDisable')
  ElMessageBox.confirm(
    i18n.t('dialog.swConfirmTitle').replace('#action', action).replace('#replace', row.mount_path),
    i18n.t('dialog.warn'),
    {
      confirmButtonText: i18n.t('btn.confirm'),
      cancelButtonText: i18n.t('btn.cancel'),
      type: 'warning',
    }
  )
  .then( async () => {
    await switchStorage({id:row.id})
    ElMessage.success(i18n.t('msg.updateSuccess'))
    initStorage()
  })
  .catch(() => {})
}

const delStorage = (row) => {
  ElMessageBox.confirm(
    i18n.t('dialog.delConfirmTitle').replace('#replace', row.mount_path),
    i18n.t('dialog.warn'),
    {
      confirmButtonText: i18n.t('btn.confirm'),
      cancelButtonText: i18n.t('btn.cancel'),
      type: 'warning',
    }
  )
  .then( async () => {
    await deleteStorage({id:row.id})
    ElMessage.success(i18n.t('msg.deleteSuccess'))
    initStorage()
  })
  .catch(() => {})
}

const onSelectEngine = (engineList) => {
  if (engineList.length > 0) {
    let matchList = []
    storageData.forEach(function(data) {
      if (engineList.includes(data.engine)) {
        matchList.push(data)
      }
    })
    storages.value = matchList
  } else {
    storages.value = storageData
  }
}

</script>

<style lang="scss" >
.status-msg {
  width: 324px!important;
  max-width: 90%;
}
</style>

<style lang="scss" scoped>
.storage {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(324px, 1fr));
  gap: 0.625rem;
  width: 100%;
}

.box-card {
  border-radius: $borderRadius;
  display: flex;
  flex-direction:column;
  align-items: center;
  column-gap: 1rem;
  background-color: #f8f9fa;
}

.box-card:hover {
  border: 1px solid rgb(24, 144, 255);
}

.option {
  margin-bottom: 2rem;
}

.panel-status {
  line-height: 1rem;
  margin: 0.5rem 0;
}

.panel-btn {
  display: flex;
  justify-content: center;
  column-gap: 0.5rem;
}

.panel-path {
  font-weight: 500;
  line-height: 1.3rem;
}

.panel-engine {
  color: #016BDB;
  background-color: #FFE7FE;
  font-size: 0.8rem;
  padding: 2px;
  box-sizing: border-box; 
  border-radius: 0.2rem;
}

.status-err {
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
}


</style>

