<template>
  <el-dialog
    :v-model="searchVisible"
    :title="$t('file.titSearch')"
    top="10vh"
    :before-close="handleClose"
    class="search-dialog"
  >
    <div class="form">
      <el-select
        v-model="form.kind"
        placeholder="Select"
        style="width:140px;"
        size="large"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-input
        v-model="form.name"
        size="large"
        clearable
        ref="inputRef"
        @keyup.enter.native="handleSearch"
      />

      <el-button type="primary" plain :icon="Search" 
        @click="handleSearch"
        :disabled="isDisabled()"
        size="large"
      >
      </el-button>
    </div>
    <div class="result" >
      <p>{{msg}}</p>
    </div>
  </el-dialog>
</template>

<script setup>
import {ref, onMounted, nextTick} from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const inputRef = ref()
const options = [
  {
    value: 0,
    label: i18n.t('file.searchOptionsAll'),
  },
  {
    value: 1,
    label: i18n.t('file.searchOptionsFile'),
  },
  {
    value: 2,
    label: i18n.t('file.searchOptionsFolder'),
  },
]
const form = ref({
  kind: options[0].value,
  name: '',
})
const msg = ref('')

const props = defineProps({
  searchVisible: {
    type: Boolean
  }
})

const emits = defineEmits(['update:modelValue'])
const handleClose = () => {
  emits('update:modelValue', false)
}

const handleSearch = () => {
  msg.value=i18n.t('file.tipSearchEmpty')
} 

const isDisabled = () => {
  return form.value.name===''?true:false
}

onMounted(() => {
  nextTick(()=>{
    inputRef.value.focus()
  })
})

</script>

<style lang="scss" scoped>
.el-dialog {
  max-width: 42rem;
}

.form {
  width: 100%;
  display:flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.result {
  min-height:100px;
  display: flex;
  justify-content: center; 

  p {
    font-size: 1.3em;
  }
}
</style>

<style lang="scss">
.search-dialog {
  border-radius: $borderRadius;
  min-width: 366px;

  .el-dialog__body {
    padding-top: 15px;
  }
}

@media (min-width:600px) and (max-width:1000px) {
  .search-dialog {
    width: 58% !important;
  }
}

@media (max-width:600px) {
  .search-dialog {
    width: 98% !important;
  }
}


</style>