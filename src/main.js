import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import 'element-plus/dist/index.css'
import '@/router/permission'
import * as ELIcons from '@element-plus/icons-vue'
import {i18n} from '@/i18n'
import filters from '@/utils/filters'
import markdown from '@/utils/markdown'
import setupStore from '@/store'

import VConsole from 'vconsole'
if (process.env.NODE_ENV === 'development') {
  const vConsole = new VConsole()
}

const app = createApp(App)
for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}

filters(app)
markdown(app)
SvgIcon(app)
setupStore(app)
app.use(router)
app.use(i18n)
app.mount('#app')
