<template>
  <el-dropdown @command="handleCommand">
    <svg-icon icon="language"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item,key) of langMap" :command="key" :disabled="currentLanguage === key">
          {{item}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import {useAppStore} from '@/store/modules/app'
import {langMap} from '@/i18n'

const appStore = useAppStore()
const i18n = useI18n()

const currentLanguage = computed(() => {
  return i18n.locale.value
})

const handleCommand = (val) => {
  i18n.locale.value = val
  appStore.changeLang(val)
}
</script>

<style lang="scss" scoped>

</style>