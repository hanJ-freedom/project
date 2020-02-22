<template>
    <div class="homePage">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="./images/swiper/1.jpg" alt="">
            </div>
            <div class="swiper-slide">
              <img src="./images/swiper/2.jpg" alt="">
            </div>
            <div class="swiper-slide">
              <img src="./images/swiper/3.jpg" alt="">
            </div>
            <div class="swiper-slide">
              <img src="./images/swiper/4.jpg" alt="">
            </div>
          </div>
           <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <div class="seek"><input type="text" placeholder="找电影、影院"></div>
        </div>
        <div class="film">
            <div class="hotShow">
                <div class="header">
                    <span class="red-name">正在热映</span><span class="more">全部{{hotary.length}}部 <span class=" arrow"></span></span>
                </div>
                <ul>
                    <li v-for="(val,key) in hotary.slice(0,6)"  @click="filmchild(val)">
                        <img :src="server1" alt="">
                        <div class="hot"><span class="hotname">{{val.name}}</span><span class="grade">{{`${val.grade}`.length>2?val.grade:val.grade+'.0'}}</span></div>
                        <div class="buy">购票</div>
                    </li>
                </ul>
            </div>
            <div class="comingSoon">
                <div class="header">
                    <span class="blue-name">即将上映</span><span class="more">全部{{comingary.length}}部 <span class=" arrow"></span></span>
                </div>
                <ul>
                    <li v-for="(val,key) in comingary.slice(0,6)"  @click="filmchild(val)">
                        <img :src="server1" alt="">
                        <div class="coming"><span class="comingname">{{val.name}}</span><span class="grade">{{`${val.grade}`.length>2?val.grade:val.grade+'.0'}}</span></div>
                        <div class="presell">预售</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {phfilmAPI} from '../../../api/api'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
    data() {
        return {
            server1:require("../../../../node/public/images/movie/hot1.jpg"),
            server:"http://localhost:8080",
            comingary:[],
            hotary:[]
        }
    },
    methods: {
        filmchild(val) {
            console.log(1)
            sessionStorage.setItem('films',JSON.stringify(val))
            this.$router.push('/filmchild')
        },
    },
    async mounted() {
        new Swiper ('.swiper-container', {
            autoplay:true,
            loop: true
        });
        const datafilm = await phfilmAPI()
        this.hotary = datafilm.filter(item=>+new Date(item.date) < + new Date())
        this.comingary = datafilm.filter(item=>+new Date(item.date) > + new Date())
    },
    computed:{
       
    }
}
</script>

<style scoped>
    .mint-swipe,.mint-swipe .mint-swipe-items-wrap{
        overflow:visible
    }
    .homePage,.mt-swipe-item,.mint-swipe-items-wrap,.data-v-da920a76{
        overflow:visible;
        width: 100%
    }
    .homePage{
        width: 100%;
    }
    .swiper-slide{
        width: 100%;
        height: 9rem
    }
    .swiper-slide img{
        width: 100%;
        height: 100%;
    } 
    .film{
        border-radius: 10%;
        border:1px solid #fff
    }
    .film li{
        width: 31%;
        height: 100%;
    }
    .film li img{
        width: 100%;
        height: 100%;
    }
    .film .header{
        display: flex;
        justify-content : space-between;
        font-size: 19px;
        padding: 4% 5% 0;
    }
    .film ul{
        padding: 4% 4% 0;
        display: flex;
        flex-wrap:wrap-reverse;
        justify-content:space-around
    }
    .film ul li{
        float: left;
        padding-bottom: 0.3rem;
        position: relative;
    }
    .buy{
        font-size: 20px;
        text-align: center;
        background-color: red;
        color: aliceblue;
        margin-top: -3px
    }
    .red-name{
        color: red;
    }
    .blue-name{
        color: blue
    }
    .more{
        font-size: 15px;
        text-align: center;
        line-height: 25px;
        display: flex;
        align-items:center
    }
    .presell{
        font-size: 20px;
        text-align: center;
        background-color: blue;
        color: aliceblue;
        margin-top: -3px
    }
    .comingSoon ul{
        margin-bottom: 4rem
    }
    .hot,.coming{
        position: absolute;
        left: 0;
        bottom: 30px;
        color: #fff;
        width: 100%;
        font-size: 14px;
        background-color: rgba(12, 1, 1, 0.575);
        padding-left: 3px;
        padding-right: 3px;
        box-sizing:border-box;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        float: left;
    }
    .hotname,.comingname{
        width: 70%;
        display: inline-block;
        box-sizing:border-box;
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .grade{
        float: right;
        color: rgb(219, 253, 27);
        font-style:italic;
        font-size: 15px
    }
    .seek{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        padding-top: 3%;
        display: flex;
        justify-content:center
    }
    .seek input{
        height: 1.8rem;
        width: 60%;
        border: 1px solid #fff;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.842) url('./sousuo.png') no-repeat;
        background-position: 2% 50%; 
        padding-left: 25px;
        box-sizing: border-box
    }
    .arrow{
        background: url('../../assets/jiantou.png') no-repeat;
        background-size: 100% 100%;
        height: 1.3rem;
        width: 1.3rem;
        align-items:center
    }
</style>