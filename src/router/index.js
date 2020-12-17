import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import Products from '@/components/pages/Products'
import Orders from '@/components/pages/Orders'
import CustomerOrder from '@/components/pages/CustomerOrder'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'CustomerOrder',
    component: CustomerOrder
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true }
      }
      // {
      //   path: '/customer_order',
      //   name: 'CustomerOrder',
      //   component: CustomerOrder
      // }
    ]
  }

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
