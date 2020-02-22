<template>
    <div id="filmchild">
        <div class="header">
            <div class="leftArrow" @click="cinemafn">
            </div>
            <h1>
                {{filmdata.name}}
            </h1>
            <p></p>
        </div>
        <div class="message">
            <img :src="server1" alt="">
            <div>
                <h1>{{filmdata.name}}</h1>
                <p>类型: {{filmdata.genre}}</p>
                <p>主演: {{filmdata.protagonist}}</p>
                <p>片长: {{filmdata.time}}</p>
                <p>上映: {{filmdata.date}}上映</p>
            </div>
        </div>
        <div class="handle">
            <div :class="xinonoff?'wantlook':'haveseen'" @click="wantfn">
                <i class="iconfont icon-xin"></i>
                <p>想看</p>
            </div>
            <div :class="copyonoff?'wantlook':'haveseen'" @click="havefn">
                <i class="iconfont icon-start-copy"></i>
                <p>看过</p>
            </div>
        </div>
        <div class="score">
            <div class="wom"> 
                <p>口碑</p>
                <p class="numofp">{{JSON.parse(filmdata.amount).length}}人想看</p>
            </div>
            <div class="stars">
                <div class="stars_i">
                    <van-rate
                        v-model="value"
                        allow-half
                        void-icon="star"
                        void-color="#eee"
                        size ="2.5rem"
                    />
                </div>
                <div class="fraction">
                    <h1>
                        {{`${this.grade}`.length>2?this.grade:this.grade+'.0'}}
                    </h1>    
                    <span>分</span> 
                </div>
            </div>
        </div>
        <div class="score">
            <div class="wom"> 
                <p>简介</p>
            </div>
            <div class="intro">
                {{filmdata.intro}}
            </div>
        </div>
        <div class="comment">
            <div class="comment_txt">
                <span class="txt">评论</span>
                <p class="partin">参与评论</p>
            </div>
            <ul>
                <li v-for="(val,key) in commentdata">
                    <div class="user_name">
                        <img :src="headport" alt="" class="monkey">
                        <h2>{{val.user_name}}</h2>
                    </div>
                    <div class="content">
                        <p class="comment_content">{{val.comment_content}}</p>
                        <p class="comment_date">{{val.comment_date}}</p>
                    </div>
                    <div :class="likedonoff?'liked liked_finger':'liked'" @click="likedfn">
                        <i  class="iconfont icon-zan"></i>
                        <span>{{JSON.parse(val.support_user).length}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="tickets"><p>特惠购票</p></div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            filmdata: {"id":1,"name":"驯龙高手3","director":"迪恩·德布洛斯","protagonist":"刘昊然","time":"130分钟","language":"英语","intro":"统领伯克岛的酋长嗝嗝（刘昊然 配音），与阿丝翠德（亚美莉卡·费雷拉 配音）共同打造了一个奇妙而热闹的飞龙乌托邦。一只雌性光煞飞龙的意外出现，加上一个前所未有的威胁的到来，令嗝嗝和没牙仔不得不离开自己唯一的家园，前往他们本以为只存在于神话之中的隐秘之境。在发现自己真正的命运之后，飞龙与骑士将携手殊死奋战，保护他们所珍爱的一切。","genre":"动漫","date":"2020-03-11","amount":"[1,3]","grade":7,"lng":4,"poster":"/images/movie/hot1.jpg","score":{1:7,3:7}},
            commentdata:[{"comment_id":1,"user_id":1,"user_name":"刘洋","films_id":1,"films_name":"驯龙高手3","user_score":8.5,"comment_content":"很好看，挺悲伤的，让我哭一会！","comment_date":"2019-08-08 15:59:38","support_user":"[1,5]","lng":1}],
            server1:require("../../../../node/public/images/movie/hot1.jpg"),
            headport:require("../../../../node/public/images/avatar/monkey.png"),
            xinonoff:false,
            copyonoff:true,
            likedonoff:true,
            value:2.5,
            grade:0
        }
    },
    mounted(){
        this.filmdata = JSON.parse(sessionStorage.getItem('films'))
        if(this.filmdata.score){
            const val = Object.values(this.filmdata.score)
            this.grade = val.reduce((a,b)=>a+b,0)/val.length
            
        }
        
    },
    methods: {
        cinemafn() {
            this.$router.go(-1)
        },
        wantfn(){
            this.xinonoff = !this.xinonoff
        },
        havefn(){
            this.copyonoff = !this.copyonoff 
        },
        likedfn(){
            this.likedonoff = !this.likedonoff
        }
    },
}
</script>

<style scoped>
    @import './tubiao/iconfont.css';
    #filmchild{
        background-color: rgb(39, 39, 70);
        color: #fff;
    }
    .tickets{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        line-height: 3rem
    }
    .tickets p{
        background-color: rgb(230, 6, 6);
        font-size: 1.3rem;
        margin: 10px 20px;
        border-radius: 40px;
        text-align: center;
        color: #fff
    }
    .header{
        padding: 1rem 0.7rem;
        display: flex;
        justify-content:space-between
    }
    .header h1{
        font-size: 1.3rem;
        font-weight: 300
    }
    .message{
        display: flex;
        margin: 0 0.7rem;
        padding: 1rem;
        color: #000;
        background-color: #fff;
        border-radius: 1rem;
        font-size: 1.1rem
    }
    .message div{
        padding: 0.8rem 0.8rem 0.8rem 1rem;
        display: flex;
        flex-direction:column;
        justify-content:center
    }
    .message h1{
        font-size: 1.3rem;
    }
    .leftArrow{
        background: url('../../assets/zuojiantou.png') no-repeat;
        background-size: 100% 100%;
        height: 1.5rem;
        width: 1.5rem;
    }
    .handle{
        margin: 0 0.7rem;
        font-size: 1.1rem;
        background-color: #fff;
        border-radius: 1rem;
        display: flex;
        justify-content:space-around
    }
    .handle div{
        margin: 0.6rem 1.5rem;
        padding: 0.6rem;
        width: 50%;
        background-color: rgb(240, 131, 6);
        text-align: center;
        border-radius: 2rem;
        display: flex;
        justify-content:center;
        align-items:center
    }
    .handle i{
        margin-right: 0.3rem
    }
    .handle .wantlook{
        background-color: rgb(240, 131, 6);
        color: #fff
    }
    .handle .haveseen{
        background-color: rgba(240, 131, 6, 0.123);
        color: rgb(240, 131, 6)
    }
    .score{
        margin: 1rem 0.7rem;
        background-color: rgb(71, 71, 99);
        border-radius: 1rem;
        display: flex;
        flex-direction:column;
        justify-content:center
    }
    .score>div{
        display: flex;
        justify-content:space-between;
        font-size: 1.2rem;
        margin: .8rem .8rem;
        font-weight: 700
    }
    .score .wom{
        margin-top: 1.3rem;
        margin-bottom: 0;
        margin-left: 1.2rem
    }
    .wom .numofp{
        font-size: 1rem;
        text-align: center
    }
    .fraction{
        display: flex;
        align-items: flex-end;
        color: rgb(240, 131, 6);
    }
    .fraction h1{
        font-size: 2.5rem
    }
    .fraction span{
        font-size: 1.2rem;
        font-style: italic;
        margin-bottom: .3rem
    }
    .score .stars{
        margin-bottom: 1.5rem
    }
    .stars .van-rate>div i{
        font-size: 4rem
    }
    .stars_i{
        display: flex;
        align-items:center;
    }
    .score .intro{
        font-size: 1.1rem;
        margin-left: 1.2rem;
        font-weight: 300;
        height: 5rem;
        overflow: auto
    }
    .comment{
        display: flex;
        flex-direction:column;
        justify-content:center;
        padding: 1.3rem 1.1rem 8rem;
        border-radius: 1rem 1rem 0 0;
        color: #000;
        background-color: #fff;
        margin-top: -0.5rem;
    
    }
    .comment .comment_txt{
        font-size: 1.2rem;
        display: flex;
        justify-content:space-between;
        font-weight: 800
    }
    .comment_txt .partin{
        background: red;
        color: #fff;
        font-size: .7rem;
        text-align: center;
        border-radius: 1rem;
        padding: .5rem .5rem .6rem;
    }
    .txt{
        padding-top:.2rem 
    }
    .comment ul li{
        display: flex;
        justify-content:space-between;
        margin-top: 1rem;
        align-items:center
    }
    .monkey{
        height: 2rem;
        width:2rem;
        /* margin-right: 2rem */
    }
    .liked{
        width: 2.3rem;
        height: 1.6rem;
        border: 1px solid rgba(153, 151, 151, 0.651);
        border-radius: 2rem;
        display: flex;
        justify-content:space-around;
        align-items:center
    }
    .content{
        width: 70%;
    }
    .liked_finger{
        color: rgba(255, 0, 0, 0.651);
        border: 1px solid rgba(255, 0, 0, 0.651);
    }
    .comment_content{
        font-size: 1.2rem;
        margin-top: .5rem
    }
    .comment_date{
        margin-top: .5rem
    }
</style>