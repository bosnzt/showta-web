<template>
  <div class="hamburger-container" @click="toggleClick" id="hamburger">
      <svg-icon :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {useAppStore} from '@/store/modules/app'
const appStore = useAppStore()
const toggleClick = () => {
  appStore.changeSiderType()
}
const icon = computed(() => {
  return appStore.siderType ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>