import Layout from '@/Layout/index.vue'
// 常量路由 公用路由
export const constantRoutes = [  
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView/index.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: Layout,
    redirect: '/error/404',
    children: [
      {
        path: '/error/404',
        name: 'error404',
        component: () => import('@/views/Error/404.vue')
      }
    ]
  }
]
