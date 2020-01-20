const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken')
const secret = '淘气'
const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./json/data.json', 'utf-8'))   //请求本地管理员数据
const datafilms = JSON.parse(fs.readFileSync('./json/films.json', 'utf-8')) //请求本地电影数据
// fs.writeFile('./json/data.json',JSON.stringify(data),function(err){})  //修改本地数据

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
    let o = data.findIndex(item => item.name === body.name);
    let obj = null;
    if (o !== -1) {
        if (data[o].password === body.password) {
            const token = jwt.sign({
                name: body.name,
                password: body.password
            },secret,{expiresIn:60*60})
            obj = {
                code: 0,
                type: '登录成功',
                token
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
    fs.writeFile('./json/films.json',JSON.stringify(datafilms),function(err){
        
    })
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



app.listen(80);