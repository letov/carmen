import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminZone from '@/components/Admin'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'admin',
    component: AdminZone
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
