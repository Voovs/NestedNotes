import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Wordcount from './views/WordcountUI.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/wc',
      name: 'wordCounter',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/wordCounter.vue')
    },
    {
      path: '/syntax',
      name: 'syntax',
      component: () => import('./views/Syntax.vue')
    },
    {
      path: '/wordcount',
      name: 'wordcountUI',
      component: Wordcount
    },
    {
      path: '/redactor',
      name: 'redactor',
      component: () => import('./views/Redactor.vue')
    }
  ]
})
