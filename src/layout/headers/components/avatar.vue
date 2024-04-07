<template>
  <div @click="logout" class="logout">
    <svg-icon icon="logout"></svg-icon>
  </div>
</template>

<script setup>
import {useAppStore} from '@/store/modules/app'
const appStore = useAppStore()

const logout = () => {
  appStore.logout()
}
</script>

<style lang="scss" scoped>
.logout:hover {
  background-color: #e1f0ff;
  border-radius: 5px;
}


</style>