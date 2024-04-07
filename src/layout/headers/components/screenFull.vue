<template>
  <div @click="handleFullScreen" id="screenFul">
    <svg-icon :icon="icon ? 'fullscreen-exit' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeMount } from 'vue'

const icon = ref(screenfull.isFullscreen)
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

const changeIcon = () => {
  icon.value = screenfull.isFullscreen
}

onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', changeIcon)
  }
})

onBeforeMount(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change')
  }
})
</script>

<style lang="scss" scoped>
@media (max-width:600px) {
  #screenFul {
    display: none;
  }
}
</style>