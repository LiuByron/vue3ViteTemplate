import Layout from '@/Layout/index.vue'
// 常量路由 公用路由
export const constantRoutes = [  
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/Error/404.vue')
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/business',
    children: [
      {
        path: '/business',
        name: 'business',
        component: () => import('@/views/System/index.vue')
      }
    ]
  }
]
