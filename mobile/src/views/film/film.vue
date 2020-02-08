<template>
    <div id="film">
        <div class="header">
            <div class="city">广州</div>
            <div :class="{'tar':onoff}" @click="onoff = true">正在热映</div>
            <div :class="{'tar':!onoff}" @click="onoff = false">即将上映</div>
            <div><img src="../homePage/sousuo.png" alt=""></div>
        </div>
        <ul v-if="onoff">
            <li v-for="(val,key) in hotary">
                <img src="../../../../node/public/images/movie/hot1.jpg" alt="">
                <div class="brief">
                    <h2>{{val.name}}</h2>
                    <p><span>评分 :</span><span style="color:yellow">{{`${val.grade}`.length>2?val.grade:val.grade+'.0'}}</span></p>
                    <p><span>类型 :</span><span>{{val.genre}}</span></p>
                    <p><span>主演 :</span><span>{{val.protagonist}}</span></p>
                </div>
                <div class="butn" @click="filmchild(val)"><p>购票</p></div>
            </li>
        </ul>
        <ul v-if="!onoff">
            <li v-for="(val,key) in comingary">
                <img src="../../../../node/public/images/movie/hot2.jpg" alt="">
                <div class="brief">
                    <h2>{{val.name}}</h2>
                    <p><span>评分 :</span><span style="color:yellow">{{`${val.grade}`.length>2?val.grade:val.grade+'.0'}}</span></p>
                    <p><span>类型 :</span><span>{{val.genre}}</span></p>
                    <p><span>主演 :</span><span>{{val.protagonist}}</span></p>
                </div>
                <div class="butn" @click="filmchild(val)"><p style="background:blue">预售</p></div>
            </li>
        </ul>
    </div>
</template>

<script>
import {phfilmAPI} from '../../../api/api'
export default {
    data() {
        return {
            comingary:[],
            hotary:[],
            onoff:true
        }
    },
    async mounted() {
        const datafilm = await phfilmAPI()
        this.hotary = datafilm.filter(item=>+new Date(item.date) < + new Date())
        this.comingary = datafilm.filter(item=>+new Date(item.date) > + new Date())
    },
    methods: {
        filmchild(val) {
            sessionStorage.setItem('films',JSON.stringify(val))
            this.$router.replace('/filmchild')
        },
    },
}
</script>

<style scoped>
    #film{
            margin-bottom: 4rem
    }
    
    .header{
        display: flex;
        justify-content:space-between;
        font-size: 20px;
        padding: 0.5rem 5%;
        background-color: red;
        color: #fff;
    }
    .header img{
        width: 2rem
    }
    .header div{
        height: 2.5rem;
        text-align: center;
        display: flex;
        align-items:center;
        color: rgb(196, 194, 194);
    }
    .header .tar{
        border-bottom: 4px solid #fff;
        color: #fff
    }
    .header .city{
        color: #fff
    }
    #film ul li{
        padding: 1rem;
        display: flex;
        justify-content:space-between
    }
    #film ul img{
        width: 25%;
    }
    #film ul li .brief{
        width: 55%;
    }
    #film ul li .brief h2{
        font-size: 19px;
        margin-bottom: 6px;
        margin-top: 3px
    }
    #film ul li .brief span{
        font-size: 18px;
        color: rgb(184, 178, 178)
    }
    #film ul li .butn{
        width: 15%;
        display: flex;
        align-items:center
    }
    #film ul li .butn p{
        width: 100%;
        height: 25%;
        background: red;
        font-size: 15px;
        color: #fff;
        border-radius:5px;
        text-align: center;
        line-height: 200% 
    }
</style>