import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nihongo',
      name: 'nihongo',
      component: () => import(/* webpackChunkName: "Nihongo" */ '../views/NihongoView.vue')
    },
    {
      path: '/nihongo/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "BunpoDetail" */ '../views/BunpoDetail.vue')
    }
  ]
})

export default router
