<template>
  <div>
    <div ref="docRef"></div>
  </div>
  
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import { renderAsync } from 'docx-preview'

let docRef = ref(null)

const props = defineProps({
  fileinfo: {
    type: Object,
    required: true,
  },
})

const isPC = () => {  
  const userAgent = navigator.userAgent || navigator.vendor || window.opera  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)  
  return !isMobile  
}

onMounted(async () => {
  let pc = isPC()
  const response = await axios.get(props.fileinfo.raw_url, {
    responseType: 'blob',
  })

  renderAsync(response.data, docRef.value, null, {
    className: "docx",  
    inWrapper: pc,  
    ignoreWidth: pc?false:true,  
    ignoreHeight: false,  
    ignoreFonts: false,  
    breakPages: true,  
    ignoreLastRenderedPageBreak: true,  
    experimental: false,  
    trimXmlDeclaration: true,  
    useBase64URL: false,  
    renderChanges: false,  
    renderHeaders: true,  
    renderFooters: true,  
    renderFootnotes: true,  
    renderEndnotes: true,  
    debug: false,
  })
})
</script>

<style lang="scss" scoped>
</style>
