<template>
  <div class="xlsx-main">
    <div id="xlsx-container"></div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import LuckyExcel from 'luckyexcel'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

let excelRef = ref(null)
const props = defineProps({
  fileinfo: {
    type: Object,
    required: true,
  },
})

onMounted(() => {
  let lang = i18n.locale.value==='zh'?'zh':'en'
  LuckyExcel.transformExcelToLuckyByUrl(props.fileinfo.raw_url, '', (exportJson, luckysheetfile) => {
    if (exportJson.sheets == null || exportJson.sheets.length == 0) {
      ElMessage.error(i18n.t('file.msgExcelErr'))
      return
    }
    window.luckysheet.destroy()
    window.luckysheet.create({
      container: 'xlsx-container', 
      lang: lang,
      showtoolbar: false, 
      showinfobar: false, 
      showstatisticBar: false, 
      sheetBottomConfig: false, 
      allowEdit: false, 
      enableAddRow: false, 
      enableAddCol: false, 
      sheetFormulaBar: false, 
      enableAddBackTop: false,
      data: exportJson.sheets, 
      title: props.fileinfo.name,
    })
  })
})
</script>

<style lang="scss" scoped>
.xlsx-main {
  position: relative;
  height: 75vh;
}

#xlsx-container {
  padding: 0px; 
  position: absolute; 
  width: 100%; 
  left: 0px; 
  top: 10px; 
  bottom: 10px;
}
</style>
