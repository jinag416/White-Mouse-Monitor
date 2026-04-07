import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginLayout from '@/layouts/Login.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import SystemView from '@/views/SystemView.vue'
import MonitorView from '@/views/MonitorView.vue'
import ArchivesView from '@/views/ArchivesView.vue'
import DataView from '@/views/DataView.vue'
import RegisterView from '@/views/RegisterView.vue'
import Dashboard from '@/views/Dashboard.vue'
import AIAnalysisView from '@/views/AIAnalysisView.vue'
import PersonalDataView from '@/views/PersonalDataView.vue'

// const checkAuth = (to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     next()// 已登录，放行
//   } else {
//     next('/login')// 未登录，跳转到登录页
//   }
// }
const routes = [
  // // 登陆路由
  // {
  //   path: '/login',
  //   component: LoginLayout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'login',
  //       component: LoginView
  //     }
  //   ]
  // },
  // // 注册路由
  // {
  //   path: '/register',
  //   component: LoginLayout,  // 复用登录页的布局
  //   children: [
  //     {
  //       path: '',
  //       name: 'register',
  //       component: RegisterView
  //     }
  //   ]
  // },
  // // 主页路由
  {
    path: '/',
    component: MainLayout,
    // beforeEnter: checkAuth,// 路由守卫
    children: [
      { path: 'home', name: '首页', component: Dashboard },
      { path: 'system', name: 'system', component: SystemView },
      { path: 'monitor', name: 'monitor', component: MonitorView },
      { path: 'archives', name: 'archives', component: ArchivesView },
      { path: 'data', name: 'data', component: DataView },
      { path: 'AIanalysis', name: 'AIanalysis', component: AIAnalysisView },
      { path: 'PersonalData', name: 'PersonalData', component: PersonalDataView },
      { path: '', redirect: '/home' }// 默认跳转首页
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router