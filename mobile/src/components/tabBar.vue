<template>
  <div class="tabBar">
    <router-view/>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="homepage">
        <div @click="$route.path.includes('/homepage')?null:$router.replace('/homepage')">
            <img :src="$route.path.includes('/homepage') ? tabBarImgArr[0].active:tabBarImgArr[0].normal">
            <p>首页</p>
        </div>
      </mt-tab-item>
      <mt-tab-item id="film">
        <div @click="$route.path.includes('/film')?null:$router.replace('/film')">
            <img :src="$route.path.includes('/film') ? tabBarImgArr[1].active:tabBarImgArr[1].normal">
            <p>电影</p>
        </div>
      </mt-tab-item>
      <mt-tab-item id="cinema">
        <div @click="$route.path.includes('/cinema')?null:$router.replace('/cinema')">
            <img :src="$route.path.includes('/cinema') ? tabBarImgArr[2].active:tabBarImgArr[2].normal">
            <p>影院</p>
        </div>
      </mt-tab-item>
      <mt-tab-item id="my">
        <div @click="$route.path.includes('/my')?null:$router.replace('/my')">
            <img :src="$route.path.includes('/my') ? tabBarImgArr[3].active:tabBarImgArr[3].normal">
            <p>我的</p>
        </div>
    </mt-tab-item>
</mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected:'',
      tabBarImgArr:[
              {normal:require('./images/home_light.svg'),active:require('./images/home_fill_light.svg')},
              {normal:require('./images/movie_light.svg'),active:require('./images/movie_fill_light.svg')},
              {normal:require('./images/cinema_light.svg'),active:require('./images/cinema_fill_light.svg')},
              {normal:require('./images/my_light.svg'),active:require('./images/my_fill_light.svg')},
      ]
    }
  },
name: 'tabBar'

}
</script>

<style>
    .tabBar{
        width: 100%;
        height: 100%;
    }
    .tabBar .mint-tabbar{
        position: fixed;
        left: 0;
        bottom: 0;
    }
    #app .mint-tabbar .is-selected{
        background-color: #fafafa;
        z-index: 999999
    }
    img{
        width:32%
    }
</style>
