<template>
  <Notice v-if="sitenotice" :sitenotice="sitenotice" />
  <div class="container">
    <!-- head area -->
    <div class="header">
      <img :src="getImageUrl()" />
      <div class="header-right">
        <div class="search" @click="handleDialogSearch">
          <el-icon><Search /></el-icon>
          <span>{{$t('file.lbSearch')}}</span>
        </div>
      </div>
    </div>
    <!-- content area -->
    <div class="content">
      <!-- top announcement -->
      <div v-if="topmd" class="top-readme">
        <el-card class="box-card">
          <v-md-preview :text="topmd"></v-md-preview>
        </el-card>
      </div>
      <!-- navigation -->
      <div class="nav">
        <ul class="nav-list">
          <li v-for="(item,index) of navlist">
            <a :href="item.url" @click.prevent="changeDir"><svg-icon v-if="index==0" icon="homepage"></svg-icon>{{item.name}}</a>
            <span v-if="navlist.length - 1 !== index" style="width:0.5rem;">/</span>
          </li>
        </ul>
      </div>
      <div v-if="fileType>0 && fileType<9">
        <el-card class="box-card" :body-style="{padding:'0.75rem 0'}">
          <div class="optbtn">
            <OptionBtn :fileinfo="fileinfo" />
          </div>
          <!-- video player -->
          <div v-if="fileType==1">
            <video-player :video="video" />
          </div>
          <!-- audio player -->
          <div v-else-if="fileType==2">
            <audio-player :album="album" />
          </div>
          <!-- picture preview -->
          <div v-else-if="fileType==3" class="picture-view">
            <img :src="viewimg">
          </div>
          <!-- processing text -->
          <div v-else-if="fileType==4">
            <v-md-preview v-if='isMarkdownFile(fileinfo)' :text="viewtxt"></v-md-preview>
            <PdfView v-else-if='isPdfFile(fileinfo)' :fileinfo="fileinfo" />
            <text-editor v-else :fileinfo="fileinfo" />
          </div>
          <!-- local docx -->
          <div v-else-if="fileType==5">
            <DocView :fileinfo="fileinfo" />
          </div>
          <!-- local xlsx -->
          <div v-else-if="fileType==6">
            <XlsxView :fileinfo="fileinfo" />
          </div>
          <!-- ms office preview -->
          <div v-else-if="fileType==7">
            <MSOffice :fileinfo="fileinfo" />
          </div>
          <!-- other file -->
          <div v-else-if="fileType==8" class="otherfile">
            <svg-icon :icon="fileIcon(otherFile)"/>
            <div class="otherfile_info">
              <b>{{otherFile.name}}</b>
              <p>{{formatFileSize(otherFile)}} / {{dateFormat(otherFile.modified)}}</p>
            </div>
          </div>
        </el-card>
      </div>
      <!-- password access -->
      <div v-else-if="fileType==99" class="privacy">
        <el-card :body-style="{padding:'2rem 1rem'}" class="box-card privacy-container" >
          <el-form size="large" :model="accessForm" class="privacy-form">
            <h2>{{$t('file.lbAccessPwd')}}</h2>
            <el-input class="privacy-pwd" type="password" show-password v-model="accessForm.password" :placeholder="$t('file.phAccessPwd')" />
            <el-button class="privacy-btn" type="primary" plain @click="onAccess">{{$t('btn.confirm')}}</el-button>
            <div class="privacy-bottom">
              <p>{{$t('file.tipHaveAccount')}} <a href="/@admin/login">{{$t('file.lbSignin')}}</a></p>
            </div>
          </el-form>
        </el-card>
      </div>
      <!-- file list -->
      <div v-else class="flist">
        <el-card class="box-card">
          <el-table 
            :data="tableData" 
            stripe  
            style="width: 100%"
            :header-cell-style="{color:'#676f77'}"
            :row-style="{color:'rgba(0,0,0,0.88)','font-size':'15px','-webkit-text-size-adjust':'none'}"
            @row-click="tableClickRow"
            :empty-text="$t('file.tipEmpty')"
          >
            <el-table-column :label="$t('table.name')" show-overflow-tooltip min-width="200" >
              <template #default="scope">
                <div style="display: flex; align-items: center;width:100%">
                  <i class="file-icon">
                    <svg-icon :icon="fileIcon(scope.row)"></svg-icon>
                  </i>                  
                  <span style="height:24px;">{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="modified" :label="$t('table.modified')" width="180">
              <template #default="scope">
                {{dateFormat(scope.row.modified)}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.size')" width="172" align="right" >
              <template #default="scope">
                {{formatFileSize(scope.row)}}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <!-- bottom announcement -->
      <div v-if="readme" class="main-readme">
        <el-card class="box-card">
          <v-md-preview :text="readme"></v-md-preview>
        </el-card>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="footer-info">
        <a href="https://www.showta.cc" target="_blank">{{$t('file.lbCopyRight')}}</a>
        <span>|</span>
        <a href="/@admin">{{$t('file.lbAdmin')}}</a>
      </div>
    </div>
  </div>
  <SearchDlg v-model="searchVisible" v-if="searchVisible" />
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import { Search, Folder, Document, House, Operation } from '@element-plus/icons-vue'
import {ref, watch, onBeforeMount} from 'vue'
import {getFlist, getFinfo} from '@/api/file'
import VideoPlayer from "./components/VideoPlayer.vue"
import AudioPlayer from "./components/AudioPlayer.vue"
import TextEditor from "./components/TextEditor.vue"
import OptionBtn from "./components/OptionBtn.vue"
import Notice from "./components/Notice.vue"
import PdfView from "./components/PdfView.vue"
import DocView from "./components/DocView.vue"
import XlsxView from "./components/XlsxView.vue"
import MSOffice from "./components/MSOffice.vue"
import SearchDlg from "./components/SearchDlg.vue"
import {dateFormat} from '@/utils/date'
import {isMdUrl, formatFileSize, fileIcon, isMarkdownFile, isPdfFile, isDocFile, isXlsxFile} from '@/utils/format'
import {compareModified} from '@/utils/sort'
import axios from 'axios'
import {useAppStore} from '@/store/modules/app'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const appStore = useAppStore()
const route = useRoute();
const router = useRouter()
const tableData = ref([])
const fileType = ref(0)
const video = ref({})
const album = ref({})
const otherFile = ref({})
const viewimg = ref('')
const viewtxt = ref('')
const topmd = ref('')
const readme = ref('')
const sitenotice = ref('')
const searchVisible = ref(false)
const navbase = {name:i18n.t('file.lbHome'), url:'/'}
const navlist = ref([navbase])
let fileinfo = ref({})
let isDir = true
let accessForm = ref({
  password: '',
})

const setNavList = () => {
  let data = [navbase]
  let curUrl = ''
  let storageKey = route.params.storageKey
  if (storageKey) {
    curUrl += '/'+storageKey
    data.push({name:storageKey, url:curUrl})
  }

  let fullpath = route.params.fullpath
  if (fullpath) {
    for (let val of fullpath) {
      curUrl += '/'+val
      data.push({name:val, url:curUrl})
    }
  }

  navlist.value = data
}

const getRpath = () => {
  let rpath = '/'
  if (route.params.storageKey) {
    rpath += route.params.storageKey
    if (route.params.fullpath) {
      rpath += '/'+ route.params.fullpath.join('/')
    }
  }

  return rpath
}

const updateList = async (rpath, isManual) => {
  fileinfo.value = {}
  tableData.value = []
  topmd.value = ''
  readme.value = ''
  let password = accessForm.value.password
  const {code, msg, data} = await getFlist({rpath:rpath, password:password})
  if (code !== 0) {
    if (code === 403) {
      fileType.value = 99
    }
    
    if (isManual) {
      ElMessage.error(msg)
    }
    
    return
  }

  if (data) {
    if (rpath==='/'&&data.list.length>0) {
      data.list.sort(compareModified)
    }

    tableData.value = data.list
    topmd.value = await getReadme(data.topmd)
    readme.value = await getReadme(data.readme) 
  }
}

const getReadme = async (content) => {
  if (!content || !isMdUrl(content)) {
    return content
  }

  const response = await axios.get(content)
  if (response.status !== 200) {
    return ''
  }

  return response.data
}

const setPreview = async (finfo) => {
  fileinfo.value = finfo
  if (finfo.ptype == 1) {
    video.value.url = finfo.raw_url
    video.value.name = finfo.name
  } else if (finfo.ptype == 2) {
    album.value.url = finfo.raw_url
    album.value.name = finfo.name
  } else if (finfo.ptype == 3) {
    viewimg.value = finfo.raw_url
  } else if (finfo.ptype >= 4 && finfo.ptype < 8) {
    if (isMarkdownFile(finfo)) {
      const response = await axios.get(finfo.raw_url)
      viewtxt.value = response.data
    }
  } else {
    otherFile.value = finfo
  }

  fileType.value = finfo.ptype
}

const loadFile = async () => {
  setNavList()
  fileType.value = 0
  let rpath = getRpath()
  if (isDir) {
    updateList(rpath, false)
  } else {
    const {code, msg, data} = await getFinfo({rpath:rpath, password:''})
    if (code !== 0) {
      ElMessage.error(msg)
      return
    }

    setPreview(data)
  }
}

const getImageUrl = () => {
  if (appStore.preference.site_logo) {
    return appStore.preference.site_logo
  }

  return new URL('../../assets/logo.png', import.meta.url).href
}

onBeforeMount(async () => {
  await appStore.updatePreference()
  setNavList()
  let rpath = getRpath()
  let password = appStore.gettersAccessPwd()
  accessForm.value.password = password
  const {code, msg, data} = await getFinfo({rpath:rpath, password: password})
  if (code !== 0) {
    if (code === 403) {
      fileType.value = 99
    }

    return
  }

  if (data.is_folder) {
    updateList(rpath, false)
  } else {
    setPreview(data)
  }

  sitenotice.value = appStore.preference.site_notice
})

watch(()=> [route.params.storageKey, route.params.fullpath], ()=>{
  loadFile()
})

const handleDialogSearch = () => {
  searchVisible.value = true
}

const tableClickRow = (row, event) => {
  isDir = row.is_folder
  router.push(row.path)
}

const changeDir = (event) => {
  isDir = true
  let href = event.target.getAttribute('href')
  router.push(href)
}

const onAccess = async () => {
  let rpath = getRpath()
  let password = accessForm.value.password
  const {code, msg, data} = await getFinfo({rpath:rpath, password:password})
  if (code !== 0) {
    ElMessage.error(i18n.t(`resp.${msg}`))
    return
  }

  appStore.setAccessPwd(password)
  fileType.value = 0
  if (data.is_folder) {
    updateList(rpath, true)
  } else {
    setPreview(data)
  }
}

</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

.container {
  display: flex;
  flex-direction: column;
  align-items:center;
}

.header {
  display: flex;
  height: 44px;
  justify-content: space-between;
  width: min(99%, 980px);
  padding-left: calc(2% + 0.5rem);
  padding-right: calc(2% + 0.5rem);
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.header img {
  margin-left: 3px;
  width: 3rem;
}

.header-right {
  height: 38px;
}

.search {
  background-color: #EDEDED;
  cursor: pointer;
  display: flex;
  align-items:center;
  width: 8rem;
  border-radius: 0.375rem;
  border: 2px solid transparent;
  padding: 0.5rem 0.5rem;
  color: #6a737d;
}

.search:hover {
  border: 2px solid #B9DAF6;
}

.search span {
  font-size: 1rem;
  margin-left: 2rem;
}

.content {
  width: min(99%, 980px);
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  gap:1rem;
}

.nav {
  width: 100%;
}

.nav-list li {
  display: inline-flex;
  gap: 0.5rem;
  align-items:center;

  a {
    padding: 0.25rem;
    border-radius: $borderRadius;
  }

  a:hover {
    background-color: $smallBgColor;
  }

  svg {
    // vertical-align: middle;
  }
}

.box-card {
  border-radius: $borderRadius;
}

.privacy-container {
  display: flex;
  justify-content: center;
}

.privacy-form {
  width: 364px;

  h2 {
    font-size: 1.2rem;
    text-align: center; 
  }

  .privacy-btn {
    width: 100%;
    font-size: 1rem;
  }

  .privacy-pwd {
    margin: 0.75rem 0;
  }
}

.privacy-bottom {
  margin-top: 3rem;

  p {
    font-size: 0.875rem;
    color: #7f878b;
    text-align: center; 

    a {
      color: #008fff;
    }
  }
}

.footer {
  margin-top: 1.5rem;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  height: 2rem;
  line-height: 2rem;
}

.footer-info a {
  padding: 0 6px;
  border-radius: $borderRadius;
}

.footer-info span {
  margin: 0 3px;
}

.footer-info a:hover {
  background-color: $smallBgColor;
}

:deep(.el-table__body) tr:hover {
  cursor: pointer;
  transform: scale(1.01);
  transition: 0.1s;
}

.optbtn {
  display:flex;
  justify-content: flex-end;
  margin: 0 0.75rem 0.75rem;
}

.picture-view {
  display:flex;
  justify-content: center;
}
.picture-view img {
  max-height: 75vh;
}

.otherfile {
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 1.5rem;

  svg {
    width: 75px;
    height: 75px;
  }
}

.otherfile_info {
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 0.875rem;
}

.otherfile_info p {
  font-size: 0.875rem;
  color: #7e868c;
  margin-bottom: 1rem;
}

.file-icon svg {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 10px;
}


</style>
