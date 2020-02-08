<template>
    <div id="filmchild">
        <div class="header">
            <div class="leftArrow">
            </div>
            <p>
                {{filmdata.name}}
            </p>
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
        <div class="tickets"><p>特惠购票</p></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filmdata: {"id":1,"name":"驯龙高手3","director":"迪恩·德布洛斯","protagonist":"刘昊然","time":"130分钟","language":"英语","intro":"统领伯克岛的酋长嗝嗝（刘昊然 配音），与阿丝翠德（亚美莉卡·费雷拉 配音）共同打造了一个奇妙而热闹的飞龙乌托邦。一只雌性光煞飞龙的意外出现，加上一个前所未有的威胁的到来，令嗝嗝和没牙仔不得不离开自己唯一的家园，前往他们本以为只存在于神话之中的隐秘之境。在发现自己真正的命运之后，飞龙与骑士将携手殊死奋战，保护他们所珍爱的一切。","genre":"动漫","date":"2020-03-11","amount":0,"grade":7,"lng":4,"poster":"/images/movie/hot1.jpg"},
            server1:require("../../../../node/public/images/movie/hot1.jpg")
        }
    },
}
</script>

<style scoped>
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
</style>