import Vue from 'vue'
import VueRouter from 'vue-router'
import tabBar from '../components/tabBar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tabBar',
    component: tabBar,
    redirect:'homepage',
    children:[
      {
        path:'homepage',
        name:'homepage',
        component: () => import('../views/homePage/homePage.vue')
      },
      {
        path:'film',
        name:'film',
        component: () => import('../views/film/film.vue')
      },
      {
        path:'cinema',
        name:'cinema',
        component: () => import('../views/cinema/cinema.vue')
      },
      {
        path:'my',
        name:'my',
        component: () => import('../views/my/my.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
