import instance from './index'

//用户登录
export const loginAPI = ({name,password})=>instance.post('http://localhost:80/login',{name,password})

//登录验证
export const isLoginAPI = ()=> instance.get('/login').then(d=>d.code===0)

//电影管理页数据请求
export const filmsAPI = (num)=>instance.post('http://localhost:80/films',{num}).then(d=>d)

//电影管理页面删除请求
export const filmsdelAPI =(id)=>instance.post('http://localhost:80/filmsdel',{id}).then(d=>d)  