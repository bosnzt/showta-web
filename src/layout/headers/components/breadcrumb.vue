<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item class="no-redirect">
      {{$t(`menu.${currentPath}`)}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const currentPath = ref('')
const initBreadcrumbList = () => {
  currentPath.value = router.currentRoute.value.name
}

const handleRedirect = (path) => {
  router.push(path)
}

watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>