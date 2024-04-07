<template>  
  <transition name="slide-fade" > 
    <el-card :body-style="{padding:'0px'}" v-if="show" class="notice">
      <div class="notice-container">
        <v-md-preview class="notice-text" :text="props.sitenotice"></v-md-preview>  
        <el-icon @click="closePopup" class="notice-close"><CloseBold /></el-icon>
      </div>
    </el-card>
  </transition>
</template>  
  
<script setup>  
import {ref, onMounted, onUnmounted} from 'vue';  

const show = ref(false)
let timerId = null
const props = defineProps({
  sitenotice: {
    type: String,
    required: true,
  },
})

const closePopup = () => {
  show.value = false
  timerId = null
}

onMounted(() => {
  show.value = true
  timerId = setInterval(() => {  
    closePopup()
  }, 4500)
})

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId)
    timerId = null 
  }
})

</script>  
  
<style lang="scss" scoped>  
.notice {  
  position: fixed;  
  right: 20px;  
  top: 20px;  
  width: 300px;  
  border-radius: $borderRadius;
  z-index: 999;  
  opacity:0.9;
}

.notice-container {
  display: flex;
  justify-content: space-between;
}

:deep(.github-markdown-body) {
  padding: 1rem 0 1rem 1rem;
}

.notice-close {
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
    background-color: #ECEEF0;
  }
}

.slide-fade-enter-active {
  transition: all 0.1s linear;
}

.slide-fade-leave-active {
  transition: all 0.1s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(2rem);
}

</style>