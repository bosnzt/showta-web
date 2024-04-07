<template>
  <div class="logo" :class="{logoCenter:!appStore.siderType}">
    <img :src="getImageUrl()" />
  </div>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="appStore.gettersDefaultMenu()"
    text-color="#fff"
    router
    unique-opened
    :collapse="!appStore.siderType"
  >
    <template v-for="(menu,index) of menusList" >
      <!-- Secondary Menu -->
      <el-sub-menu v-if="menu.children && menu.children.length>0" :index="index" :key="menu.name" >
        <template #title>
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <span>{{menu.name}}</span>
        </template>

        <el-menu-item :index="it.path" v-for="it of menu.children" :key="it.name"
        >
          <el-icon>
            <component :is="it.icon"></component>
          </el-icon>
          <span>{{$t(`menu.${it.path}`)}}</span>
        </el-menu-item>

      </el-sub-menu>
      <!-- First menu -->
      <app-link v-else :data="menu">
        <el-menu-item :index="menu.mtype===2?'':menu.path" :key="menu.name"
        >
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <template #title>
            {{$t(`menu.${menu.name}`)}}
          </template>
        </el-menu-item>
      </app-link>



    </template>

  </el-menu>
</template>

<script setup>
import {menuList} from '@/api/menu'
import { ref, onBeforeMount } from 'vue'
import AppLink from './link.vue'
import {useAppStore} from '@/store/modules/app'
const appStore = useAppStore()

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')

const menusList = ref([])
const initMenusList = async() => {
  menusList.value = await menuList()
}

initMenusList()

const getImageUrl = () => {
  if (appStore.preference.site_logo) {
    return appStore.preference.site_logo
  }

  return new URL('../../assets/logo.png', import.meta.url).href
}

onBeforeMount(async ()=>{
  await appStore.updatePreference()
})

</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  margin-top: 0.5rem;
  padding-left: 40px;

  img {
    width: 30px;
  }
}

.logoCenter {
  padding-left: 20px;
}


:deep(.el-menu-item .el-menu-tooltip__trigger) {
  width: auto !important;
}
</style>