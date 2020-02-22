<template>
    <div class="myuser">
        <div class="header">
            <i class="iconfont icon-cha" @click="$router.go(-1)"></i>
            <span>登录</span>
        </div>
        <div class="sign_register">
            <p 
                :class="$route.path.includes('/user/sign_in')?'sign_in':''" 
                @click="$route.path.includes('/user/sign_in')?null:$router.replace('/user/sign_in')">
                账号登录
                <span class="sign" v-if="$route.path.includes('/user/sign_in')"></span>
                </p>
            <p 
                :class="$route.path.includes('/user/register')?'sign_in':''"
                @click="$route.path.includes('/user/register')?null:$router.replace('/user/register')"
            >账号注册<span class="sign"  v-if="$route.path.includes('/user/register')"></span></p>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import './tubiao/iconfont.css';
.header{
    font-size: 1.4rem;
    margin-top: .8rem;
}
.header i{
    font-size: 1.4rem;
    margin-left: .6rem;
    margin-right: .5rem
}
.sign_register{
    display: flex;
    margin-bottom: 1rem
}
.sign_register>p{
    width: 50%;
    text-align: center;
    font-size: 1.2rem;
    margin-top: 1rem;
    padding-bottom: .5rem;
    font-weight: 200;
    position: relative;
}
.sign_register .sign_in{
    font-size: 1.3rem;
    font-weight: 700;
}
.sign{
    width: 1rem;
    height: .3rem;
    background-color: rgb(59, 192, 245);
    display: block;
    border-radius: 20rem;
    position: absolute;
    bottom: 0;
    left: 5.44rem;
}
</style>