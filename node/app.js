const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken')
const secret = '淘气'
const fs = require('fs')

const dataman = JSON.parse(fs.readFileSync('./json/data.json', 'utf-8'))   //请求本地管理员数据
const datafilms = JSON.parse(fs.readFileSync('./json/films.json', 'utf-8')) //请求本地电影数据
const datausers = JSON.parse(fs.readFileSync('./json/user.json', 'utf-8'))   //请求本地用户数据
const datacinema = JSON.parse(fs.readFileSync('./json/cinema.json', 'utf-8'))   //请求本地影院数据
let datahall = JSON.parse(fs.readFileSync('./json/hall.json', 'utf-8'))   //请求本地影厅数据
let datasched = JSON.parse(fs.readFileSync('./json/schedule.json', 'utf-8'))   //请求本地排片数据
let datacomment = JSON.parse(fs.readFileSync('./json/comment.json', 'utf-8'))   //请求本地评论数据
let dataorder = JSON.parse(fs.readFileSync('./json/order.json', 'utf-8'))   //请求本地订单数据
// fs.writeFile('./json/data.json',JSON.stringify(dataman),function(err){})  //修改本地数据

app.use(express.static('../pc/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods','GET, POST') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
})
console.log('1', '2')

//登录验证请求
app.post('/login', (req, res) => {
    const { body } = req;
    let o = dataman.findIndex(item => item.name === body.name);
    let obj = null;
    if (o !== -1) {
        if (dataman[o].password === body.password) {
            let admin = {name:dataman[o].name,id:dataman[o].id}
            const token = jwt.sign({
                name: body.name,
                password: body.password
            },secret,{expiresIn:60*60})
            obj = {
                code: 0,
                type: '登录成功',
                token,
                admin:JSON.stringify(admin)
            }
        } else {
            obj = {
                code: 1,
                type: '账号或密码错误'
            }
        }
    } else {
        obj = {
            code: 1,
            type: '账号或密码错误'
        }
    }
    res.json(obj);
})

//电影管理页数据请求
app.post('/films',(req,res)=>{
    const {num} = req.body
    let data = datafilms.slice((num-1)*6,num*6)
    data.forEach(ele => {
        ele.lng = Math.ceil(datafilms.length/6) 
    });
    res.json(data)
})

//电影管理页删除数据请求
app.post('/filmsdel',(req,res)=>{
    const {id} = req.body
    let index = datafilms.findIndex(item => item.id === id)
    datafilms.splice(index,1)
    fs.writeFile('./json/films.json',JSON.stringify(datafilms),function(err){})
    datasched = datasched.filter(item => {
        return item.films_id !== id
    })
    fs.writeFile('./json/schedule.json',JSON.stringify(datasched),function(err){})
    let obj = {
        code: 0,
        type: '删除成功'
    }
    res.json(obj)
})

//电影管理页修改数据请求
app.post('/filmsalter',(req,res)=>{
    const {data} = req.body
    const {id} = data
    let index = datafilms.findIndex(item => item.id === id)
    datafilms[index] = data
    fs.writeFile('./json/films.json',JSON.stringify(datafilms),function(err){})
    let obj = {
        code: 0,
        type: '修改成功'
    }
    res.json(obj)
})

//电影管理页添加数据
app.post('/filmsadd',(req,res)=>{
    const {data} = req.body
    datafilms.push(data)
    fs.writeFile('./json/films.json',JSON.stringify(datafilms),function(err){})
    let obj = {
        code: 0,
        type: '添加成功'
    }
    res.json(obj)
})

//电影管理页搜索数据
app.post('/filmssearch',(req,res)=>{
    let {str,num} = req.body
    let data = datafilms.filter(item=>{
        for (const attr in item) {
            if (attr === "genre"||attr === "name"||attr === "id"||attr === "director"||attr ==="date") {
                let val = item[attr]+''
                let reg = new RegExp(str,'g')
                if(reg.test(val)){
                    return true
                }
            }
        }
    })
    num = !num?1:num
    let datason = data.slice((num-1)*6,num*6)
    if(datason.length){
        datason.forEach(ele => {
                ele.lng = Math.ceil(data.length/6) 
        });
    }
    res.json(datason)
})

//管理员数据请求
app.post('/manager',(req,res)=>{
    const {num} = req.body
    let data = dataman.slice((num-1)*6,num*6)
    data.forEach(ele => {
        ele.lng = Math.ceil(dataman.length/6)
    });
    res.json(data)
})

//管理人员删除请求
app.post('/managerdel',(req,res)=>{
    const {id} = req.body
    let index = dataman.findIndex(item => item.id === id)
    dataman.splice(index,1)
    fs.writeFile('./json/data.json',JSON.stringify(dataman),function(err){})
    let obj = {
        code: 0,
        type: '删除成功'
    }
    res.json(obj)
})

//管理员信息修改请求
app.post('/manageralter',(req,res)=>{
    const {data} = req.body
    const {id} = data
    let index = dataman.findIndex(item => item.id === id)
    dataman[index] = data
    fs.writeFile('./json/data.json',JSON.stringify(dataman),function(err){})
    let obj = {
        code: 0,
        type: '修改成功'
    }
    res.json(obj)
})

//管理员页添加新的管理员
app.post('/manageradd',(req,res)=>{
    const {data} = req.body
    dataman.push(data)
    fs.writeFile('./json/data.json',JSON.stringify(dataman),function(err){})
    let obj = {
        code: 0,
        type: '添加成功'
    }
    res.json(obj)
})

//管理员页搜索
app.post('/managersear',(req,res)=>{
    let {str,num} = req.body
    let data = dataman.filter(item=>{
        for (const attr in item) {
            if (attr === "sex"||attr === "name"||attr === "id"||attr === "birthday"||attr ==="phone") {
                let val = item[attr]+''
                let reg = new RegExp(str,'g')
                if(reg.test(val)){
                    return true
                }
            }
        }
    })
    num = !num?1:num
    let datason = data.slice((num-1)*6,num*6)
    if(datason.length){
        datason.forEach(ele => {
                ele.lng = Math.ceil(data.length/6) 
        });
    }
    res.json(datason)
})

//用户管理页数据请求
app.post('/users',(req,res)=>{
    const {num} = req.body
    let data = datausers.slice((num-1)*6,num*6)
    data.forEach(ele => {
        ele.lng = Math.ceil(datausers.length/6) 
    });
    res.json(data)
})

//用户管理页删除数据请求
app.post('/usersdel',(req,res)=>{
    const {id} = req.body
    let index = datausers.findIndex(item => item.id === id)
    datausers.splice(index,1)
    fs.writeFile('./json/user.json',JSON.stringify(datausers),function(err){})
    let obj = {
        code: 0,
        type: '删除成功'
    }
    res.json(obj)
})

//用户管理页搜索
app.post('/usersear',(req,res)=>{
    let {str,num} = req.body
    let data = datausers.filter(item=>{
        for (const attr in item) {
            if (attr === "sex"||attr === "name"||attr === "id"||attr === "birthday"||attr ==="phone") {
                let val = item[attr]+''
                let reg = new RegExp(str,'g')
                if(reg.test(val)){
                    return true
                }
            }
        }
    })
    num = !num?1:num
    let datason = data.slice((num-1)*6,num*6)
    if(datason.length){
        datason.forEach(ele => {
            ele.lng = Math.ceil(data.length/6) 
        });
    }
    res.json(datason)
})

//影院管理页数据请求
app.post('/cinema',(req,res)=>{
    const {num} = req.body
    let data = datacinema.slice((num-1)*6,num*6)
    data.forEach(ele => {
        ele.lng = Math.ceil(datacinema.length/6) 
    });
    res.json(data)
})

//影院管理页删除数据请求
app.post('/cinemadel',(req,res)=>{
    const {id} = req.body
    let index = datacinema.findIndex(item => item.id === id)
    datacinema.splice(index,1)
    fs.writeFile('./json/cinema.json',JSON.stringify(datacinema),function(err){})
    datahall = datahall.filter(item => {
        return item.cinema_id !== id
    })
    fs.writeFile('./json/hall.json',JSON.stringify(datahall),function(err){})
    datasched = datasched.filter(item => {
        return item.cinema_id !== id
    })
    fs.writeFile('./json/schedule.json',JSON.stringify(datasched),function(err){})
    let obj = {
        code: 0,
        type: '删除成功'
    }
    res.json(obj)
})

//影院管理页修改数据请求
app.post('/cinemalter',(req,res)=>{
    const {data} = req.body
    const {id} = data
    let index = datacinema.findIndex(item => item.id === id)
    datacinema[index] = data
    fs.writeFile('./json/cinema.json',JSON.stringify(datacinema),function(err){})
    datahall.forEach(item=>{
        if(item.cinema_id === id){
            item.cinema_name = data.name
            item.cinema_phone = data.phone
        }
    })
    fs.writeFile('./json/hall.json',JSON.stringify(datahall),function(err){})
    let obj = {
        code: 0,
        type: '修改成功'
    }
    res.json(obj)
})

//影院管理页添加数据
app.post('/cinemadd',(req,res)=>{
    const {data} = req.body
    datacinema.push(data)
    fs.writeFile('./json/cinema.json',JSON.stringify(datacinema),function(err){})
    let obj = {
        code: 0,
        type: '添加成功'
    }
    res.json(obj)
})

//影院管理页搜索数据
app.post('/cinemasear',(req,res)=>{
    let {str,num} = req.body
    let data = datacinema.filter(item=>{
        for (const attr in item) {
            let val = item[attr]+''
            let reg = new RegExp(str,'g')
            if(reg.test(val)){
                return true
            }
        }
    })
    num = !num?1:num
    let datason = data.slice((num-1)*6,num*6)
    if(datason.length){
        datason.forEach(ele => {
                ele.lng = Math.ceil(data.length/6) 
        });
    }
    res.json(datason)
})

//其他页面的影院数据请求
app.post('/hallcinema',(req,res)=>{
    let data = datacinema.map(item=>{
        let obj = {}
        obj.id = item.id
        obj.name = item.name
        obj.phone = item.phone
        return obj
    })
    res.json(data)
})

//影厅管理页数据请求
app.post('/hall',(req,res)=>{
    const {num} = req.body
    let data = datahall.slice((num-1)*6,num*6)
    data.forEach(ele => {
        ele.lng = Math.ceil(datahall.length/6) 
    });
    res.json(data)
})

//影厅管理页删除数据请求
app.post('/halldel',(req,res)=>{
    const {id} = req.body
    console.log(id)
    let index = datahall.findIndex(item => item.hall_id === id)
    datahall.splice(index,1)
    fs.writeFile('./json/hall.json',JSON.stringify(datahall),function(err){})
    datasched = datasched.filter(item => {
        return item.hall_id !== id
    })
    fs.writeFile('./json/schedule.json',JSON.stringify(datasched),function(err){})
    let obj = {
        code: 0,
        type: '删除成功'
    }
    res.json(obj)
})

//影厅管理页修改数据请求
app.post('/hallalter',(req,res)=>{
    const {data} = req.body
    const {hall_id} = datafilms
    let index = datahall.findIndex(item => item.hall_id === hall_id)
    datahall[index] = data
    fs.writeFile('./json/schedule.json',JSON.stringify(datahall),function(err){})
    let obj = {
        code: 0,
        type: '修改成功'
    }
    res.json(obj)
})

//影厅管理页添加数据
app.post('/halladd',(req,res)=>{
    const {data} = req.body
    datahall.push(data)
    fs.writeFile('./json/schedule.json',JSON.stringify(datahall),function(err){})
    let obj = {
        code: 0,
        type: '添加成功'
    }
    res.json(obj)
})

//影厅管理页搜索数据
app.post('/hallsear',(req,res)=>{
    let {str,num} = req.body
    let data = datahall.filter(item=>{
        for (const attr in item) {
            let val = item[attr]+''
            let reg = new RegExp(str,'g')
            if(reg.test(val)){
                return true
            }
        }
    })
    num = !num?1:num
    let datason = data.slice((num-1)*6,num*6)
    if(datason.length){
        datason.forEach(ele => {
                ele.lng = Math.ceil(data.length/6) 
        });
    }
    res.json(datason)
})

//排片管理页数据请求
app.post('/schedule',(req,res)=>{
    const {num} = req.body
    let data = datasched.slice((num-1)*6,num*6)
    data.forEach(ele => {
        ele.lng = Math.ceil(datasched.length/6) 
    });
    res.json(data)
})

//排片管理页删除数据请求
app.post('/scheduledel',(req,res)=>{
    const {id} = req.body
    let index = datasched.findIndex(item => item.hall_id === id)
    datasched.splice(index,1)
    fs.writeFile('./json/schedule.json',JSON.stringify(datasched),function(err){})
    let obj = {
        code: 0,
        type: '删除成功'
    }
    res.json(obj)
})

//排片管理页修改数据请求
app.post('/schedulealter',(req,res)=>{
    const {data} = req.body
    const {schedule_id} = data
    let index = datasched.findIndex(item => item.schedule_id === schedule_id)
    datasched[index] = data
    fs.writeFile('./json/schedule.json',JSON.stringify(datasched),function(err){})
    let obj = {
        code: 0,
        type: '修改成功'
    }
    res.json(obj)
})

//排片管理页添加数据
app.post('/scheduleadd',(req,res)=>{
    const {data} = req.body
    datasched.push(data)
    fs.writeFile('./json/hall.json',JSON.stringify(datasched),function(err){})
    let obj = {
        code: 0,
        type: '添加成功'
    }
    res.json(obj)
})

//排片管理页搜索数据
app.post('/schedulesear',(req,res)=>{
    let {str,num} = req.body
    let data = datasched.filter(item=>{
        for (const attr in item) {
            let val = item[attr]+''
            let reg = new RegExp(str,'g')
            if(reg.test(val)){
                return true
            }
        }
    })
    num = !num?1:num
    let datason = data.slice((num-1)*6,num*6)
    if(datason.length){
        datason.forEach(ele => {
                ele.lng = Math.ceil(data.length/6) 
        });
    }
    res.json(datason)
})

//其他页面电影数据请求
app.post('/schedfilm',(req,res)=>{
    let ary = datafilms.map(item=>{
        let obj = {}
        obj.id = item.id
        obj.name = item.name
        obj.date = item.date
        return obj
    })
    res.json(ary)
})

//排片管理页影厅数据请求
app.post('/schedhall',(req,res)=>{
    let {num} = req.body
    let data = datahall.filter(item=>item.cinema_id===num)
    res.json(data)
})

//评论管理页数据请求
app.post('/comment',(req,res)=>{
    const {num} = req.body
    let data = datacomment.slice((num-1)*6,num*6)
    data.forEach(ele => {
        ele.lng = Math.ceil(datacomment.length/6) 
    });
    res.json(data)
})

//评论管理页删除数据请求
app.post('/commentdel',(req,res)=>{
    const {id} = req.body
    let index = datacomment.findIndex(item => item.comment_id === id)
    datacomment.splice(index,1)
    fs.writeFile('./json/comment.json',JSON.stringify(datacomment),function(err){})
    let obj = {
        code: 0,
        type: '删除成功'
    }
    res.json(obj)
})

//评论管理页搜索
app.post('/commentsear',(req,res)=>{
    let {str,num} = req.body
    let data = datacomment.filter(item=>{
        for (const attr in item) {
            let val = item[attr]+''
            let reg = new RegExp(str,'g')
            if(reg.test(val)){
                return true
            }
        }
    })
    num = !num?1:num
    let datason = data.slice((num-1)*6,num*6)
    if(datason.length){
        datason.forEach(ele => {
            ele.lng = Math.ceil(data.length/6) 
        });
    }
    res.json(datason)
})

//订单管理页数据请求
app.post('/order',(req,res)=>{
    const {num} = req.body
    let data = dataorder.slice((num-1)*6,num*6)
    data.forEach(ele => {
        ele.lng = Math.ceil(dataorder.length/6) 
    });
    res.json(data)
})

//订单管理页删除数据请求
app.post('/orderdel',(req,res)=>{
    const {id} = req.body
    let index = dataorder.findIndex(item => item.order_id === id)
    dataorder.splice(index,1)
    fs.writeFile('./json/order.json',JSON.stringify(dataorder),function(err){})
    let obj = {
        code: 0,
        type: '删除成功'
    }
    res.json(obj)
})

//订单管理页搜索
app.post('/ordersear',(req,res)=>{
    let {str,num} = req.body
    let data = dataorder.filter(item=>{
        for (const attr in item) {
            let val = item[attr]+''
            let reg = new RegExp(str,'g')
            if(reg.test(val)){
                return true
            }
        }
    })
    num = !num?1:num
    let datason = data.slice((num-1)*6,num*6)
    if(datason.length){
        datason.forEach(ele => {
            ele.lng = Math.ceil(data.length/6) 
        });
    }
    res.json(datason)
})

app.listen(80);