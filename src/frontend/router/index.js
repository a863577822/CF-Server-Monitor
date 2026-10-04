import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  ...(import.meta.env.VITE_PULSE_THEME === 'true' ? [] : [{
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/index.vue')
  }]),
  {
    path: '/server/:id',
    name: 'Server',
    component: () => import('../views/ServerDetail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
