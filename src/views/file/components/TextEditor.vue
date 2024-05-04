<template>
  <div ref='editorRef' id='text-editor'></div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution'

const editorRef = ref()
let monacoElem

const props = defineProps({
  fileinfo: {
    type: Object,
    required: true,
  },
})

const isSideScreen = computed(() => {
  return window.innerWidth > 600
})

onMounted(async () => {
  const response = await axios.get(props.fileinfo.raw_url)

  let model = monaco.editor.createModel(
    response.data,
    undefined,
    monaco.Uri.parse(props.fileinfo.name)
  )
  monacoElem = monaco.editor.create(editorRef.value, {
    model: model,
    wordWrap: true,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    readOnly: true,
    theme: 'vs',
    lineNumbers:isSideScreen.value?'on':'off',
    minimap: {
      enabled: isSideScreen.value,
    },
  })
})

onBeforeUnmount(() => {
  monacoElem && monacoElem.dispose()
  monaco.editor.getModels().forEach((item) => {
    item.dispose();
  })
})

</script>

<style lang="scss" scoped>
#text-editor {
  height: 60vh;
  width: 100%;
}
</style>
