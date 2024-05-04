<template>
  <div class="doc-container">
    <iframe class="doc-frame" :src="docSrc"></iframe>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'

const docSrc = ref('')

const props = defineProps({
  fileinfo: {
    type: Object,
    required: true,
  },
})

onMounted(() => {
  docSrc.value = 'http://view.officeapps.live.com/op/view.aspx?src='+ encodeURIComponent(props.fileinfo.raw_url)
})

</script>

<style lang="scss" scoped>
.doc-container {
  text-align: center;
}

.doc-frame {
  height: 75vh;
  width: 99%;
  margin: 0 auto;
}

</style>
