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
  ,
  {
    path:'/filmchild',
    name:'filmchild',
    component: () => import('../views/film/filmchild.vue')
  },
  {
    path:'/user',
    name:'user',
    component: () => import('../views/my/myuser.vue'),
    redirect:'/user/sign_in',
    children:[
      {
        path:'sign_in',
        name:'sign_in',
        component: () => import('../views/my/sign_register/sign_in.vue')
      },
      {
        path:'register',
        name:'register',
        component: () => import('../views/my/sign_register/register.vue')
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
