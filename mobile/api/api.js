import instance from './index'

//手机端首页数据请求
export const phfilmAPI = ()=>instance.post('http://localhost:80/phfilm').then(d=>d)

//手机端影院数据请求
export const phcinemaAPI = () => instance.post('http://localhost:80/phcinema').then(d=>d)

//手机端用户登录请求
export const phloginAPI = (body) => instance.post('http://localhost:80/phlogin',body).then(d=>d)