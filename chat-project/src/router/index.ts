import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationPage from '../components/AuthorizationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuthorizationPage
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
