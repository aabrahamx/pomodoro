import { createRouter, createWebHistory } from 'vue-router';

import Pomodoro from '@/views/Pomodoro.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Pomodoro,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
});

export default router;