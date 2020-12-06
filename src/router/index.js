import Vue from 'vue'
import VueRouter from 'vue-router'
import template from '../views/template.vue'
import FishInfo from '../views/fishInfo.vue'
import pinList from '../views/pinList.vue'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'jquery'

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'template',
    component: template
  },
  
  {
    path: '/pinList',
    name: 'pinList',
    component: pinList
  },
  {
    path: '/:id',
    name: 'FishInfo',
    component: FishInfo
  },

]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
