<template>
  <div class="pdf-header">
    <div v-if="isLoading">
      {{$t('file.lbPdfLoad')}}...
    </div>

    <div v-else class="real-header">
      <span v-if="showAllPages" class="page-info">{{$t('file.lbPdfPages').replace('#replace', pageCount)}}</span>
      <span v-else class="page-info">
        <button :disabled="page <= 1" @click="page--">❮</button>
        <span class="page-tip">{{ page }} / {{ pageCount }}</span>
        <button :disabled="page >= pageCount" @click="page++">❯</button>
      </span>

      <span>
        <button @click="handleZoomOut">-</button>
        <span class="zoom-tip">{{zoomNum}}%</span>
        <button @click="handleZoomIn">+</button>
      </span>

      <label class="page-right">
        <input v-model="showAllPages" type="checkbox">
        {{$t('file.lbPdfShowAll')}}
        <el-tooltip :content="$t('file.tipPdfHelp')" placement="top-end" effect="light">
          <el-icon class="key-tip"><QuestionFilled /></el-icon>
        </el-tooltip>
      </label>

    </div>
  </div>

  <div class="pdf-content" >
    <vue-pdf-embed
      ref="pdfRef"
      :source="pdfSource"
      :page="page"
      @rendered="handleDocumentRender" 
    />
  </div>
</template>

<script setup>
import {ref, watch, computed} from 'vue'
import VuePdfEmbed  from 'vue-pdf-embed'
import { useMagicKeys } from '@vueuse/core'

const props = defineProps({
  fileinfo: {
  type: Object,
  required: true,
  },
})

const { ArrowLeft, ArrowRight } = useMagicKeys()
const pdfRef = ref()
const isLoading = ref(true)
const page = ref(null)
const pageCount = ref(1)
const pdfSource = ref({
  cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.1.392/cmaps/',
  cMapPacked: true,
  url: props.fileinfo.raw_url,
})
const showAllPages = ref(true)
const zoomNum = ref(70)

watch(showAllPages, (newValue) => {    
  page.value = newValue ? null : 1;  
})

const handleDocumentRender = () => {
  isLoading.value = false
  pageCount.value = pdfRef.value.pageCount
}

const handleZoomIn = () => {
  if (zoomNum.value >= 500) {

  }

  zoomNum.value += 5
}

const handleZoomOut = () => {
  if (zoomNum.value <= 5) {
    return
  }

  zoomNum.value -= 5
}

watch([ArrowLeft, ArrowRight], ([leftVal, rightVal]) => {
  if (isLoading.value || showAllPages.value) {
    return
  }

  if (leftVal && page.value > 1) {
    page.value--
  }

  if (rightVal && page.value < pageCount.value) {
    page.value++
  }
}) 

const contentWidth = computed(() => {
  return `${zoomNum.value}%`;
})

</script>

<style lang="scss" scoped>

.vue-pdf-embed {
  overflow: scroll;
  overflow-y: hidden;
}

.vue-pdf-embed::-webkit-scrollbar {
  width: 18px;
  height: 18px;
}

.vue-pdf-embed::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #eee;
}

.vue-pdf-embed::-webkit-scrollbar-thumb:hover {
  background-color: #CBCBFF;
}

:deep(.vue-pdf-embed > div) {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}

:deep(.vue-pdf-embed canvas) {
  width: v-bind('contentWidth') !important;
  height: 100% !important;
  margin: 0 auto;
}

.pdf-header {
  padding: 12px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
  background-color: #525659;
  color: white;

  span {
    height: 20px;
    line-height: 20px;
  }

  button {
    cursor: pointer;
    padding: 0 5px;
  }
}

.page-info {
  min-width: 100px;
}

.page-tip {
  display: inline-block;
  min-width: 50px;
  text-align: center;
  margin: 0 2px;
}

.zoom-tip {
  display: inline-block;
  min-width: 40px;
  text-align: center;
  margin: 0 2px;
}

.key-tip {
  vertical-align: text-bottom;
  padding-bottom: 1px;
}

.real-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-right input {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

</style>
