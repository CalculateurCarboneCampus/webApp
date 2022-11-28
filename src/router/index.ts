import { createRouter, createWebHashHistory } from 'vue-router'
import {useDataStore} from "@/stores/dataStore"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/login',
      name: 'connection',
      component: () => import('../views/LoginView.vue')
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },

    {
      path: '/admin/project/:userID/:projectSlug',
      name: 'admin.project',
      component: () => {
        return import('../views/ProjectDraftView.vue')
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(
    to.name !== 'connection'
    &&  useDataStore().user.isNotConnected ) next({name: 'connection'}
  )
  next()
})

export default router
