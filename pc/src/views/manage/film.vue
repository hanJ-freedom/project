<template>
<div>
    <el-container>
        <el-header style="height: 70px;">
            <div style="margin-top: 5px;width:40%;display: inline-block">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="seekfn"></el-button>
                </el-input>
            </div>
            <el-row style="width:20%;display: inline-block">
                <el-button type="primary" @click="additionfn">添加电影</el-button>
            </el-row>
        </el-header>
        <el-main style="height:''">
            <div style="width:70%;margin:0 auto">
                <template>
                    <el-table
                    border
                    :data="tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="id"
                        label="电影 ID"
                        width="100"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="电影名"
                        align="center"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="director"
                        label="导演"
                        width="135"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="genre"
                        label="类型"
                        align="center"
                        width="75">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        align="center"
                        label="上映时间"
                        width="135"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column 
                        label="操作" 
                        width="160" 
                        align="center">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-main>
        <el-footer>
            <el-pagination
                background
                layout="prev, pager, next"
                :useless = "sum"
                :page-count="num"
                @current-change="ymfn"
                :current-page = "ymnum"
                >
            </el-pagination>
        </el-footer>
    </el-container>
    <div class="redact" v-if="onoff">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h2 style="color:black;margin-bottom:20px">修改信息</h2>
            <el-form-item label="电影名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="导演名称" prop="director">
                <el-input v-model="ruleForm.director"></el-input>
            </el-form-item>
            <el-form-item label="主演名称" prop="protagonist">
                <el-input v-model="ruleForm.protagonist"></el-input>
            </el-form-item>
            <el-form-item label="上映时间" required>
                <el-col :span="11">
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="电影时长" prop="time">
                <el-input placeholder="请输入内容" v-model="ruleForm.time">
                </el-input>
            </el-form-item>
            <el-form-item label="语言"  prop="language">
                <el-select v-model="ruleForm.language" placeholder="请选择语言">
                    <el-option label="国语" value="国语"></el-option>
                    <el-option label="英语" value="英语"></el-option>
                    <el-option label="韩语" value="韩语"></el-option>
                    <el-option label="日语" value="日语"></el-option>
                    <el-option label="粤语" value="粤语"></el-option>
                    <el-option label="泰语" value="泰语"></el-option>
                    <el-option label="阿拉伯语" value="阿拉伯语"></el-option>
                    <el-option label="朝鲜语" value="朝鲜语"></el-option>
                    <el-option label="意大利语" value="意大利语"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型"  prop="genre">
                <el-select v-model="ruleForm.genre" placeholder="请选择类型">
                    <el-option label="动漫" value="动漫"></el-option>
                    <el-option label="科幻" value="科幻"></el-option>
                    <el-option label="剧情" value="剧情"></el-option>
                    <el-option label="言情" value="言情"></el-option>
                    <el-option label="喜剧" value="喜剧"></el-option>
                    <el-option label="爱情" value="爱情"></el-option>
                    <el-option label="动作" value="动作"></el-option>
                    <el-option label="冒险" value="冒险"></el-option>
                    <el-option label="青春" value="青春"></el-option>
                    <el-option label="悬疑" value="悬疑"></el-option>
                    <el-option label="恐怖" value="恐怖"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电影简介" prop="intro">
                <el-input type="textarea" v-model="ruleForm.intro"></el-input>
            </el-form-item>
            <el-form-item label-width="40px">
                <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="redact" v-if="onoff2">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <h2 style="color:black;margin-bottom:20px">添加信息</h2>
            <el-form-item label="电影名称" prop="name">
                <el-input v-model="ruleForm2.name"></el-input>
            </el-form-item>
            <el-form-item label="导演名称" prop="director">
                <el-input v-model="ruleForm2.director"></el-input>
            </el-form-item>
            <el-form-item label="主演名称" prop="protagonist">
                <el-input v-model="ruleForm2.protagonist"></el-input>
            </el-form-item>
            <el-form-item label="上映时间" required>
                <el-col :span="11">
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm2.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="电影时长" prop="time">
                <el-input placeholder="请输入内容" v-model="ruleForm2.time">
                </el-input>
            </el-form-item>
            <el-form-item label="语言"  prop="language">
                <el-select v-model="ruleForm2.language" placeholder="请选择语言">
                    <el-option label="国语" value="国语"></el-option>
                    <el-option label="英语" value="英语"></el-option>
                    <el-option label="韩语" value="韩语"></el-option>
                    <el-option label="日语" value="日语"></el-option>
                    <el-option label="粤语" value="粤语"></el-option>
                    <el-option label="泰语" value="泰语"></el-option>
                    <el-option label="阿拉伯语" value="阿拉伯语"></el-option>
                    <el-option label="朝鲜语" value="朝鲜语"></el-option>
                    <el-option label="意大利语" value="意大利语"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型"  prop="genre">
                <el-select v-model="ruleForm2.genre" placeholder="请选择类型">
                    <el-option label="动漫" value="动漫"></el-option>
                    <el-option label="科幻" value="科幻"></el-option>
                    <el-option label="剧情" value="剧情"></el-option>
                    <el-option label="言情" value="言情"></el-option>
                    <el-option label="喜剧" value="喜剧"></el-option>
                    <el-option label="爱情" value="爱情"></el-option>
                    <el-option label="动作" value="动作"></el-option>
                    <el-option label="冒险" value="冒险"></el-option>
                    <el-option label="青春" value="青春"></el-option>
                    <el-option label="悬疑" value="悬疑"></el-option>
                    <el-option label="恐怖" value="恐怖"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电影简介" prop="intro">
                <el-input type="textarea" v-model="ruleForm2.intro"></el-input>
            </el-form-item>
            <el-form-item label-width="40px">
                <el-button type="primary" @click="submitForm2('ruleForm2')">确定添加</el-button>
                <el-button @click="resetForm2('ruleForm2')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
    
</template>

<script>
import {filmsAPI} from '../../../api/api'
import {filmsdelAPI} from '../../../api/api'
import {filmsalterAPI} from '../../../api/api'
import {filmsaddAPI} from '../../../api/api'
import {filmssearchAPI} from '../../../api/api'
import { MessageBox} from "element-ui";
export default {
    data() {
        return {
            input3: '',
            tableData: [],
            num:0,
            ymnum:1,
            onoff:false,
            onoff2:false,
            searchon:false,
            ruleForm: {      //修改数据
                name: '',
                director: '',
                protagonist: '',
                date: '',
                time: 0,
                language: '',
                intro: '',
                genre:''
            },
            ruleForm2: {     //添加数据
                id:+Date.now(),
                name: '',
                director: '',
                protagonist: '',
                date: '',
                time: 0,
                language: '',
                intro: '',
                genre:'',
                grade:0,
                amount:0
            },
            rules: {        //添加数据和修改数据的验证
                name: [
                    { required: true, message: '请输入电影名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                director: [
                    { required: true, message: '请输入导演名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                protagonist: [
                    { required: true, message: '请输入主演名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '请输入电影时长,单位分钟', trigger: 'blur' },
                    { min: 4, max: 5, message: '长度在 4 到 5 个字符', trigger: 'blur' },
                    { validator :  function(rule, value, callback){console.log(rule, value, callback)
                            if(/\d{2,3}分钟$/.test(value)){
                                    callback()
                            }else{
                                callback(new Error('前2到3个为数字,最后单位要为分钟'))
                            }
                        }, trigger: 'blur'
                    
                    }
                ],
                language: [
                    { required: true, message: '请选择语言类型', trigger: 'change' }
                ],
                intro: [
                    { required: true, message: '请填写简介', trigger: 'blur' }
                ],
                genre: [
                     { required: true, message: '请选择电影类型', trigger: 'change' }
                ]
                }
            }
    },
    methods: {
        handleEdit(index, row) {       //编辑
            for(let attr in  row){
                this.ruleForm[attr] = row[attr]
            }
            this.ruleForm.date = new Date(row.date)
            this.onoff = true
        },
        handleDelete(index, row) {       //删除
            MessageBox.confirm(
                "此操作将永久删除该管理人员的所有信息, 是否继续？",
                "提示"
            ).then(async value=>{
                let leg = this.tableData.length
                let obj = await filmsdelAPI(row.id)   //删除请求
                if(leg === 1){         //当为当前页最后一个时
                    --this.ymnum       //将请求的数据变为上一页
                    --this.num          //总页数减一
                }
                if(this.input3.trim() !== ''){
                    this.tableData = await filmssearchAPI(this.input3.trim(),this.ymnum)
                }else{
                    this.tableData = await filmsAPI(this.ymnum)    //再次请求数据
                }
                this.num = this.tableData[0]?this.tableData[0].lng:1
                this.$message({
                    message: obj.type,
                    type: 'success'
                })
            })
            
        },
        async ymfn(e){     //页码数据请求
            if(this.input3.trim() !== ''&&this.searchon){
                this.tableData = await filmssearchAPI(this.input3.trim(),e)
            }else{
                this.tableData = await filmsAPI(e)
            }
            this.ymnum=e
            this.num = this.tableData[0]?this.tableData[0].lng:1
        },
        submitForm(formName) {  //数据的修改
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let id = this.ruleForm.id
                    let index = this.tableData.findIndex(item => item.id === id)
                    for(let attr in this.tableData[index]){
                        this.tableData[index][attr] = this.ruleForm[attr]
                    }
                    let dates = this.tableData[index].date
                    let year = dates.getFullYear()
                    let month = dates.getMonth() + 1
                    let day = dates.getDate()
                    this.tableData[index].date = year + '-' + month + '-' + day
                    let obj =  await filmsalterAPI(this.tableData[index])
                    if(this.input3.trim() !== ''){
                        this.tableData = await filmssearchAPI(this.input3.trim(),this.ymnum)
                    }else{
                        this.tableData = await filmsAPI(this.ymnum) 
                    }
                    this.onoff = false
                    this.$message({
                        message: obj.type,
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: '请正确填写',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        async resetForm(formName) {   //取消修改
            this.onoff = false
        },
        additionfn(){  //添加电影
            this.onoff2 = true
        },
        submitForm2(formName){   //确定添加电影
            console.log(this.$refs[formName])
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //拷贝
                    let data = {}
                    for(let attr in this.ruleForm2){
                        data[attr] = this.ruleForm2[attr]
                    }
                    //改变时间
                    let dates = data.date
                    let year = dates.getFullYear()
                    let month = dates.getMonth() + 1
                    let day = dates.getDate()
                    data.date = year + '-' + month + '-' + day
                    //发送添加请求
                    let obj =  await filmsaddAPI(data)
                    if(this.input3.trim() !== ''){
                        this.tableData = await filmssearchAPI(this.input3.trim(),this.ymnum)
                    }else{
                        //发送刷新页面请求
                        this.tableData = await filmsAPI(this.ymnum)
                    }
                    //修改页码
                    this.num = this.tableData[0]?this.tableData[0].lng:1
                    //关闭窗口
                    this.onoff2 = false
                    this.$message({
                        message: obj.type,
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: '请正确填写',
                        type: 'warning'
                    });
                    return false;
                }
                this.$refs[formName].resetFields();
            });
        },
        resetForm2(formName){   //取消添加电影
            this.onoff2 = false
            this.$refs[formName].resetFields();
        },
        async seekfn(){      //搜索请求
            this.ymnum = 1
            if(this.input3.trim() === ''){
                this.tableData = await filmsAPI(1)
                this.searchon = false
            }else{
                this.tableData = await filmssearchAPI(this.input3.trim())
                this.searchon = true
            }
            this.num = this.tableData[0]?this.tableData[0].lng:1
        }
    },
    computed:{
        async sum(){   //获取页码和第一次数据请求
            this.tableData = await filmsAPI(1)
            this.num = this.tableData[0]?this.tableData[0].lng:1
        }
    }
}
</script>

<style scoped>
/* 外框样式 */
    .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 70px;
    width: 100%
  }
  .el-footer{
      height: 50px;
      line-height: 50px
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 0;
    padding: 10px 0 0 0 
  }
  
  .el-container {
    height: 100%;
    width: 100%
  }

  .el-select .el-input {
    width: 130px;
  }
  /* 搜索栏 */
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
.el-table td{
    padding: 0;
}

/* 编辑 */
.redact{
    background-color: rgba(0, 0, 13, 0.836);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items:center;
    overflow: hidden;
    z-index: 10
}
.demo-ruleForm{
    width: 20%;
    height: 90%;
    border: 1px rgb(146, 119, 119) solid;
    padding:20px ;
    background: #fff;
}
.el-form-item{
    margin-bottom: 15px;
}
</style>