<template>
    <el-container class="app-wrapper">
      <el-aside class="sidebar-container" :class="{sidebarHide:!appStore.siderType}">
        <Menu />
      </el-aside>
      <el-container class="container" :class="{ hidderContainer: !appStore.siderType }">
        <el-header><Headers /></el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import Menu from './Menu'
import Headers from './headers'
import { computed, onBeforeMount } from 'vue'
import variables from '@/styles/variables.module.scss'
import {useAppStore} from '@/store/modules/app'

const appStore = useAppStore()

onBeforeMount(()=> {
  appStore.loadSiderType()
})

</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  width: $sideBarWidth;
}

.sidebarHide {
  width: $hideSideBarWidth;
}

.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}

@media (max-width:600px) {
  .sidebarHide {
    width: 0;
  }

  .container.hidderContainer {
    width: 100%;
  }
}

:deep(.el-header) {
  padding: 0;
}
</style>