import { createRouter, createWebHistory} from 'vue-router';
import { constantRoutes } from './constantRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [...constantRoutes]
})

export default router;