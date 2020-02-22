<template>
    <div>
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="signfn">
                    登录
                </van-button>
            </div>
    </div>
</template>

<script>
import {phloginAPI} from '../../../../api/api';
import { Toast } from 'vant';
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async signfn(){
            let obj = await phloginAPI({name:this.username,password:this.password})
            if(obj.code === 0){
                Toast('登录成功');
                this.$router.go(-1)
            }else{
                Toast('用户名或密码错误');
            }
        }
    },
}
</script>

<style>

</style>