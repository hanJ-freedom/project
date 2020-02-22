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
            <van-field 
                v-model="tel" 
                type="tel" 
                label="手机号" 
                name="手机号" 
                placeholder="请输入手机号"
                :error-message="error"
                required
            />
            <van-field name="radio" label="单选框">
                <template #input>
                    <van-radio-group v-model="radio" direction="horizontal">
                        <van-radio name="男">男</van-radio>
                        <van-radio name="女">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                v-model="message"
                rows="2"
                autosize
                label="签名"
                type="textarea"
                maxlength="50"
                placeholder="请输入个人签名"
                show-word-limit
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    注册并登录
                </van-button>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            radio: '男',
            tel: '',
            message:'',
            error:''
        }
    },
    methods: {
        
    },
}
</script>

<style>

</style>