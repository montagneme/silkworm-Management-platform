import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index/index'
import environment from '@/view/environment/environment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/environment',
      name: 'environment',
      component: environment
    }
  ]
})
