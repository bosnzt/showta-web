<template>
  <el-form :model="form" label-width="120px">
    <el-form-item :label="$t('display.lbVideo')">
      <el-checkbox class="quick"
        v-model="checkAllVideo"
        :indeterminate="isIndeterminateVideo"
        @change="handleCheckAllVideo"
      >{{$t('display.lbSelectAll')}}</el-checkbox>
      <el-checkbox-group
        v-model="form.video"
        @change="handleCheckedVideoChange"
      >
        <el-checkbox class="option" v-for="item in videos" :key="item" :label="item">
          {{item}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="$t('display.lbPicture')">
      <el-checkbox class="quick"
        v-model="checkAllPicture"
        :indeterminate="isIndeterminatePicture"
        @change="handlecheckAllPicture"
      >{{$t('display.lbSelectAll')}}</el-checkbox>
      <el-checkbox-group
        v-model="form.picture"
        @change="handleCheckedPictureChange"
      >
        <el-checkbox class="option" v-for="item in pictures" :key="item" :label="item">
          {{item}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="$t('display.lbText')">
      <el-checkbox class="quick"
        v-model="checkAllText"
        :indeterminate="isIndeterminateText"
        @change="handleCheckAllText"
      >{{$t('display.lbSelectAll')}}</el-checkbox>
      <el-checkbox-group
        v-model="form.text"
        @change="handleCheckedTextChange"
      >
        <el-checkbox class="option" v-for="item in texts" :key="item" :label="item">
          {{item}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="$t('display.lbAudio')">
      <el-checkbox class="quick"
        v-model="checkAllAudio"
        :indeterminate="isIndeterminateAudio"
        @change="handleCheckAllAudio"
      >{{$t('display.lbSelectAll')}}</el-checkbox>
      <el-checkbox-group
        v-model="form.audio"
        @change="handleCheckedAudioChange"
      >
        <el-checkbox class="option" v-for="item in audios" :key="item" :label="item">
          {{item}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="$t('display.lbOffice')">
      <el-radio-group v-model="form.office">
        <el-radio label="local" size="large">{{$t('display.officeOptLocal')}}</el-radio>
        <el-radio label="ms" size="large">{{$t('display.officeOptMS')}}</el-radio>
      </el-radio-group>
      <div class="tip">{{$t('display.tipOffice')}}</div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size='large' @click="onSubmit">{{$t('btn.save')}}</el-button>
    </el-form-item>    
  </el-form>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue'
import {getDisplay, updateDisplay} from '@/api/preference'
import { ElMessage} from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const form = ref({
  video: [],
  picture: [],
  text:[],
  audio:[],
  office:'0',
})
const videos = ref([])
const pictures = ref([])
const texts = ref([])
const audios = ref([])

//video
const isIndeterminateVideo = ref(true)
const checkAllVideo = ref(false)
const handleCheckAllVideo = (val) => {
  form.value.video = val ? videos.value : []
  isIndeterminateVideo.value = false
}

const handleCheckedVideoChange = (value) => {
  const checkedCount = value.length
  checkAllVideo.value = checkedCount === videos.value.length
  isIndeterminateVideo.value = checkedCount > 0 && checkedCount < videos.value.length
}
//pic
const isIndeterminatePicture = ref(true)
const checkAllPicture = ref(false)
const handlecheckAllPicture = (val) => {
  form.value.picture = val ? pictures.value : []
  isIndeterminatePicture.value = false
}

const handleCheckedPictureChange = (value) => {
  const checkedCount = value.length
  checkAllPicture.value = checkedCount === pictures.value.length
  isIndeterminatePicture.value = checkedCount > 0 && checkedCount < pictures.value.length
}
//text
const isIndeterminateText = ref(true)
const checkAllText = ref(false)
const handleCheckAllText = (val) => {
  form.value.text = val ? texts.value : []
  isIndeterminateText.value = false
}

const handleCheckedTextChange = (value) => {
  const checkedCount = value.length
  checkAllText.value = checkedCount === texts.value.length
  isIndeterminateText.value = checkedCount > 0 && checkedCount < texts.value.length
}
//audio
const isIndeterminateAudio = ref(true)
const checkAllAudio = ref(false)
const handleCheckAllAudio = (val) => {
  form.value.audio = val ? audios.value : []
  isIndeterminateAudio.value = false
}

const handleCheckedAudioChange = (value) => {
  const checkedCount = value.length
  checkAllAudio.value = checkedCount === audios.value.length
  isIndeterminateAudio.value = checkedCount > 0 && checkedCount < audios.value.length
}

onBeforeMount(async()=> {
  let resp = await getDisplay()
  videos.value = resp.template.video
  pictures.value = resp.template.picture
  texts.value = resp.template.text
  audios.value = resp.template.audio

  for (const element of resp.data) {
    if (element.key === 'preview_video') {
      form.value.video = element.value.split(",")
      handleCheckedVideoChange(form.value.video)
    } else if (element.key === 'preview_picture') {
      form.value.picture = element.value.split(",")
      handleCheckedPictureChange(form.value.picture)
    } else if (element.key === 'preview_text') {
      form.value.text = element.value.split(",")
      handleCheckedTextChange(form.value.text)
    } else if (element.key === 'preview_audio') {
      form.value.audio = element.value.split(",")
      handleCheckedAudioChange(form.value.audio)
    } else if (element.key === 'preview_office') {
      form.value.office = element.value
    }
  }
})

const onSubmit = async () => {
  await updateDisplay(form.value)
  ElMessage.success(i18n.t('msg.saveSuccess'))
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  color: $formLabelColor;
}

.quick {
  width:100%;
}
.option {
  width: 2.75rem;
}

.tip {
  width: 100%;
  color: $formTipColor;
  line-height: 1.5rem;
  font-size: 0.8rem;
}

</style>
