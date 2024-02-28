import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationView from '@/views/AuthorizationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/WelcomeView.vue')
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: AuthorizationView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: 'chat',
          name: 'chat',
          component: () => import('../views/ChatView.vue')
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('../views/NewsView.vue')
        }
      ]
    }
  ]
})

export default router
