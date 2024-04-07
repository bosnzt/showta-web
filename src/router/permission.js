import router from './index'
import {useAppStore} from '@/store/modules/app'


const whiteList = ['/@admin/login']
router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  if (appStore.gettersToken()) {
    if (to.path === '/@admin/login') {
      next('/@admin')
    } else {
      appStore.changeMenu(to.path)
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next()
    }
  }
})