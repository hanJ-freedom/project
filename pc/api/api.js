import instance from './index'

//用户登录
export const loginAPI = ({name,password})=>instance.post('http://localhost:80/login',{name,password})

//电影管理页数据请求
export const filmsAPI = (num)=>instance.post('http://localhost:80/films',{num}).then(d=>d)

//电影管理页面删除请求
export const filmsdelAPI =(id)=>instance.post('http://localhost:80/filmsdel',{id}).then(d=>d)  

//电影管理页修改数据请求
export const filmsalterAPI = (data)=>instance.post('http://localhost:80/filmsalter',{data}).then(d=>d)

//电影管理页添加数据请求
export const filmsaddAPI = (data)=> instance.post('http://localhost:80/filmsadd',{data}).then(d=>d)

//电影管理页搜索请求
export const filmssearchAPI =(str,num) => instance.post('http://localhost:80/filmssearch',{str,num}).then(d=>d)

//管理人员页数据请求
export const manageAPI = (num) => instance.post('http://localhost:80/manager',{num}).then(d=>d)

//管理人员页删除请求
export const managedelAPI =(id)=>instance.post('http://localhost:80/managerdel',{id}).then(d=>d)  

//管理人员信息修改请求
export const manageralterAPI = (data)=>instance.post('http://localhost:80/manageralter',{data}).then(d=>d)

//新增管理人员请求
export const manageraddAPI = (data)=>instance.post('http://localhost:80/manageradd',{data}).then(d=>d)

//管理人员搜索请求
export const managersearAPI = (str,num)=>instance.post('http://localhost:80/managersear',{str,num}).then(d=>d)

//用户管理页数据请求
export const usersAPI = (num)=> instance.post('http://localhost:80/users',{num}).then(d=>d)

//用户管理页面删除请求
export const usersdelAPI =(id)=>instance.post('http://localhost:80/usersdel',{id}).then(d=>d) 

//用户管理搜索请求
export const usersearAPI = (str,num)=>instance.post('http://localhost:80/usersear',{str,num}).then(d=>d)

//影院管理页数据请求
export const cinemaAPI = (num)=>instance.post('http://localhost:80/cinema',{num}).then(d=>d)

//影院管理页面删除请求
export const cinemadelAPI =(id)=>instance.post('http://localhost:80/cinemadel',{id}).then(d=>d)  

//影院管理页修改数据请求
export const cinemalterAPI = (data)=>instance.post('http://localhost:80/cinemalter',{data}).then(d=>d)

//影院管理页添加数据请求
export const cinemaddAPI = (data)=> instance.post('http://localhost:80/cinemadd',{data}).then(d=>d)

//影院管理页搜索请求
export const cinemasearAPI =(str,num) => instance.post('http://localhost:80/cinemasear',{str,num}).then(d=>d)

//其他页面的影院数据请求
export const hallcinemaAPI = ()=>instance.post('http://localhost:80/hallcinema').then(d=>d)

//影厅管理页数据请求
export const hallAPI = (num)=>instance.post('http://localhost:80/hall',{num}).then(d=>d)

//影厅管理页面删除请求
export const halldeldelAPI =(id)=>instance.post('http://localhost:80/halldel',{id}).then(d=>d)  

//影厅管理页修改数据请求
export const hallalterAPI = (data)=>instance.post('http://localhost:80/hallalter',{data}).then(d=>d)

//影厅管理页添加数据请求
export const halladdAPI = (data)=> instance.post('http://localhost:80/halladd',{data}).then(d=>d)

//影厅管理页搜索请求
export const hallsearAPI =(str,num) => instance.post('http://localhost:80/hallsear',{str,num}).then(d=>d)

//排片管理页数据请求
export const scheduleAPI = (num)=>instance.post('http://localhost:80/schedule',{num}).then(d=>d)

//排片管理页面删除请求
export const scheduledelAPI =(id)=>instance.post('http://localhost:80/scheduledel',{id}).then(d=>d)  

//排片管理页修改数据请求
export const schedulealterAPI = (data)=>instance.post('http://localhost:80/schedulealter',{data}).then(d=>d)

//排片管理页添加数据请求
export const scheduleaddAPI = (data)=> instance.post('http://localhost:80/scheduleadd',{data}).then(d=>d)

//排片管理页搜索请求
export const schedulesearAPI =(str,num) => instance.post('http://localhost:80/schedulesear',{str,num}).then(d=>d)

//其他页面的电影数据请求
export const schedfilmAPI = ()=>instance.post('http://localhost:80/schedfilm').then(d=>d)

//其他页面的电影数据请求
export const schedhallAPI = (num)=>instance.post('http://localhost:80/schedhall',{num}).then(d=>d)