import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/user/login'], resolve),
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/views/user/register'], resolve),
    },
    {
      path: '/my',
      name: 'my',
      component: resolve => require(['@/views/user/my'], resolve),
    },
    {
      path: '/all',
      name: 'all',
      component: resolve => require(['@/views/user/all'], resolve),
    },
    {
      path: '/cart',
      name: 'cart',
      component: resolve => require(['@/views/user/cart'], resolve),
    },
    {
      path: '/detail:commodity_shop',
      name: 'detail',
      component: resolve => require(['@/views/user/detail'], resolve),
    },
    {
      path: '/eatDetail',
      name: 'eatDetail',
      component: resolve => require(['@/views/user/eatDetail'], resolve),
    },
    {
      path: '/pay',
      name: 'pay',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['@/views/user/pay'], resolve),
    },
    {
      path: '/modify',
      name: 'modify',
      component: resolve => require(['@/views/user/modify'], resolve),
    },
    {
      path: '/addAddress:address_user',
      name: 'addAddress',
      component: resolve => require(['@/views/user/addAddress'], resolve),
    },
    {
      path: '/addressList:from',
      name: 'addressList',
      component: resolve => require(['@/views/user/addressList'], resolve),
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      component: resolve => require(['@/views/user/editAddress'], resolve),
    },
    {
      path: '/order',
      name: 'order',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['@/views/user/order'], resolve),
    },
    {
      path: '/foodDetail',
      name: 'foodDetail',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['@/views/user/foodDetail'], resolve),
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['@/views/user/orderDetail'], resolve),
    },
  ]
})
