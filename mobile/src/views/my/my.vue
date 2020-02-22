<template>
    <div id="my">
        <div class="header">
            <div class="headport portback"></div>
            <span @click="$router.push('/user')">{{username}}</span>
        </div>
        <ul>
            <li>
                <p>我的订单</p>
                <div class="arrow"></div>
            </li>
            <li>
                <p>想看的电影</p>
                <div class="arrow"></div>
            </li>
            <li>
                <p>看过的电影</p>
                <div class="arrow"></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'登录/注册'
        }
    },
    mounted(){
        if(sessionStorage.getItem('admid')){
            this.username = JSON.parse(sessionStorage.getItem('admid')).name
        }
    }
}
</script>

<style scoped>
    #my{
        background-color: rgba(231, 230, 229, 0.753);
        height: 100%;
    }
    .header{
        width: 100%;
        height: 7rem;
        background-color: rgb(219, 6, 6);
        display: flex;
        align-items:center
    }
    .portback{
        background: url('./touxiang.png') no-repeat;
        background-size: 100% 100%
    }
    .headport{
        width: 4.5rem;
        height: 4.5rem;
        border: 3px solid #fff;
        border-radius: 50%;
        margin-left: 2rem
    }
    .header span{
        color: #fff;
        font-size: 18px;
        margin-left: 0.8rem;
    }
    #my ul{
        margin-top: 1rem
    }
    #my ul li{
        background-color: #fff;
        margin-top: 0.5rem;
        display: flex;
        justify-content:space-between;
        align-items:center
    }
    #my ul p{
        color: #000;
        font-size: 17px;
        padding: 1rem;
        font-weight: 800
    }
    #my ul li .arrow{
        background: url('../../assets/jiantou.png') no-repeat;
        background-size: 100% 100%;
        height: 1.5rem;
        width: 1.5rem;
        margin: 1rem;
    }
</style>