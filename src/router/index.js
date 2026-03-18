import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PackagesView from '../views/PackagesView.vue'
import PackageDetailsView from '../views/PackageDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/packages',
      name: 'packages',
      component: PackagesView,
    },
    {
      path: '/packages/:id',
      name: 'package-details',
      component: PackageDetailsView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router

