<template>
  <a v-if="data.mtype===1" :href="data.path">
    <slot></slot>
  </a>
  <a v-else-if="data.mtype===2" :href="data.path" target="_blank">
    <slot></slot>
  </a>
  <template v-else>
    <slot></slot>
  </template >
  
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<style lang="scss" scoped></style>
