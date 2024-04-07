<template>
  <el-dropdown size="large">
    <svg-icon class="optbtn-icon" icon="optbtn"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="copyUrl">{{$t('file.btnCopyLink')}}</el-dropdown-item>
        <el-dropdown-item @click="downloadFile">{{$t('file.btnDownload')}}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const { toClipboard } = useClipboard()
const props = defineProps({
  fileinfo: {
    type: Object,
    required: true,
  },
})

const copyUrl = async () => {
  await toClipboard(props.fileinfo.raw_url)
  ElMessage.success(i18n.t('file.msgCopy'))
}

const downloadFile = () => {
  window.open(props.fileinfo.raw_url)
}

</script>

<style lang="scss" scoped>
.optbtn-icon {
  cursor: pointer;
  width: 1.75rem;
  padding: 0.25rem;
  border-radius: 0.375rem;
}

.optbtn-icon:hover {
  background-color: $smallBgColor;
}


.el-tooltip__trigger { outline: none; }

</style>