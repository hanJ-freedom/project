import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    redirect:'/about/film',
    component: () => import('../views/About.vue'),
    children:[
      {
        path:'users',
        name:'users',
        component:()=> import('../views/manage/users.vue')
      },
      {
        path:'film',
        name:'film',
        component:()=> import('../views/manage/film.vue')
      },
      {
        path:'cinema',
        name:'cinema',
        component:()=> import('../views/manage/cinema.vue')
      },
      {
        path:'moviehall',
        name:'moviehall',
        component:()=> import('../views/manage/moviehall.vue')
      },
      {
        path:'rowpiece',
        name:'rowpiece',
        component:()=> import('../views/manage/rowpiece.vue')
      },
      {
        path:'comment',
        name:'comment',
        component:()=> import('../views/manage/comment.vue')
      },
      {
        path:'order',
        name:'order',
        component:()=> import('../views/manage/order.vue')
      },
      {
        path:'manager',
        name:'manager',
        component:()=> import('../views/manage/manager.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,form,next)=>{ //路由跳转拦截检测是否登录
  if(to.path==='/'){
    next()
  }else{
    if(form.path === '/'){
      if(sessionStorage.getItem('token')){
        next()
      }else{
        next('/')
      }
    }else{
      next()
    }
  }
  
})

export default router
