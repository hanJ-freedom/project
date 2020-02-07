import axios from 'axios'

const instance = axios.create()  //创建自定义拦截在需要的时候进行局部拦截

//请求拦截
//当数据请求的时候将token发送给后端进行验证
//如果是session那么要看是否为同域，如果是同域就直接发cookie即可
//如果不是同域，需要在获取到返回数据之后，存储一下这个令牌码，然后通过参数传过去

instance.interceptors.request.use(config=>{
    console.log('成功', '去')
    const token = sessionStorage.getItem('token')
    if(token){
        config.headers['Authorization']=sessionStorage.getItem('token')
    }
    return config
},error=>{
    return Promise.reject(error)
})

//响应拦截
//获取token或者别的令牌信息,然后存储到本地

instance.interceptors.response.use(config=>{
    console.log('成功', '回')
    console.log(config.data)
    if(config.data.token){
        sessionStorage.setItem('token',config.data.token)
        sessionStorage.setItem('admid',config.data.admin)
    }
    return config.data
},error=>{
    return Promise.reject(error)
})

export default instance