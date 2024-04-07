import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/@admin/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    component: () => import('@/views/file/index.vue')
  },
  {
    path: '/:storageKey/:fullpath(.*)*',
    component: () => import('@/views/file/index.vue')
  },
  {
    path: '/@admin',
    name: 'admin',
    component: () => import('../layout'),
    redirect: '/@admin/home',
    children: [
      {
        path: '/@admin/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/@admin/user',
        name: 'user',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/@admin/storage',
        name: 'storage',
        component: () => import('@/views/storage/index.vue')
      },
      {
        path: '/@admin/storage/mount',
        name: 'mountstorage',
        component: () => import('@/views/storage/mount.vue')
      },
      {
        path: '/@admin/storage/edit/:id',
        name: 'editstorage',
        component: () => import('@/views/storage/mount.vue')
      },
      {
        path: '/@admin/folder',
        name: 'folder',
        component: () => import('@/views/folder/index.vue')
      },
      {
        path: '/@admin/folder/add',
        name: 'addfolder',
        component: () => import('@/views/folder/edit.vue')
      },
      {
        path: '/@admin/folder/edit/:id',
        name: 'editfolder',
        component: () => import('@/views/folder/edit.vue')
      },
      {
        path: '/@admin/backup',
        name: 'backup',
        component: () => import('@/views/backup/index.vue')
      },
      {
        path: '/@admin/preference/site',
        name: 'site',
        component: () => import('@/views/preference/site.vue')
      },
      {
        path: '/@admin/preference/display',
        name: 'display',
        component: () => import('@/views/preference/display.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
