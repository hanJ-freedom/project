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
                <el-button type="primary" @click="additionfn">添加影院</el-button>
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
                        label="影院 ID"
                        width="100"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="影院名称"
                        align="center"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="影院电话"
                        width="135"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="city"
                        label="所在城市"
                        align="center"
                        width="75">
                    </el-table-column>
                    <el-table-column
                        prop="counties"
                        align="center"
                        label="所在区县"
                        width="75"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="site"
                        align="center"
                        label="详细地址"
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
                :page-count="num"
                @current-change="ymfn"
                :current-page = "ymnum"
                >
            </el-pagination>
        </el-footer>
    </el-container>
    <div class="redact" v-if="onoff">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h2 style="color:black;margin-bottom:40px;margin-top:20px">修改信息</h2>
            <el-form-item label="影院名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="影院电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="所在省份" prop="province">
                <el-input v-model="ruleForm.province"></el-input>
            </el-form-item>
            <el-form-item label="所在市区" prop="city">
                <el-input v-model="ruleForm.city"></el-input>
            </el-form-item>
            <el-form-item label="所在县区" prop="counties">
                <el-input placeholder="请输入内容" v-model="ruleForm.counties">
                </el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="site">
                <el-input type="textarea" v-model="ruleForm.site"></el-input>
            </el-form-item>
            <el-form-item label-width="40px">
                <el-button type="primary" @click="submitForm('ruleForm')">确定添加</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="redact" v-if="onoff2">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <h2 style="color:black;margin-bottom:40px;margin-top:20px">添加影院</h2>
            <el-form-item label="影院名称" prop="name">
                <el-input v-model="ruleForm2.name"></el-input>
            </el-form-item>
            <el-form-item label="影院电话" prop="phone">
                <el-input v-model="ruleForm2.phone"></el-input>
            </el-form-item>
            <el-form-item label="所在省份" prop="province">
                <el-input v-model="ruleForm2.province"></el-input>
            </el-form-item>
            <el-form-item label="所在市区" prop="city">
                <el-input v-model="ruleForm2.city"></el-input>
            </el-form-item>
            <el-form-item label="所在县区" prop="counties">
                <el-input placeholder="请输入内容" v-model="ruleForm2.counties">
                </el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="site">
                <el-input type="textarea" v-model="ruleForm2.site"></el-input>
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
import {cinemaAPI} from '../../../api/api'
import {cinemadelAPI} from '../../../api/api'
import {cinemalterAPI} from '../../../api/api'
import {cinemaddAPI} from '../../../api/api'
import {cinemasearAPI} from '../../../api/api'
import { MessageBox} from "element-ui";
export default {
    data() {
        var valid2 = (rule,value,callback)=>{
            if(/[\u4e00-\u9fa5]/.test(value)){
                callback()
            }
            callback(new Error('请输入中文地址'))
        };
        var valid = (rule, value, callback) => {
            console.log(value)
            if (/^1\d{10}$/.test(value)) {
                callback();
            }
            callback(new Error('请输入正确的电话号码'));
        };
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
                phone: '',
                province: '',
                city: '',
                counties: '',
                site: ''
            },
            ruleForm2: {     //添加数据
                id:+Date.now(),
                name: '',
                phone: '',
                province: '',
                city: '',
                counties: '',
                site: ''
            },
            rules: {        //添加数据和修改数据的验证
                name: [
                    { required: true, message: '请输入影院名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入影院电话', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在 11 到 11 个字符', trigger: 'blur' },
                    { validator : valid ,trigger: 'blur'}
                ],
                province: [
                    { required: true, message: '请输入所在省份', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
                    { validator : valid2 ,trigger: 'blur'}
                ],
                city: [
                    { required: true, message: '请输入所在市区', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
                    { validator : valid2 ,trigger: 'blur'}
                ],
                counties: [
                    { required: true, message: '请输入所在县区', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
                    { validator : valid2 ,trigger: 'blur'}
                ],
                intro: [
                    { required: true, message: '请填写详细地址', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.ymfn(1)
    },
    methods: {
        handleEdit(index, row) {       //编辑
            for(let attr in  row){
                this.ruleForm[attr] = row[attr]
            }
            this.onoff = true
        },
        handleDelete(index, row) {       //删除
            MessageBox.confirm(
                "此操作将永久删除该管理人员的所有信息, 是否继续？",
                "提示"
            ).then(async value=>{
                let leg = this.tableData.length
                let obj = await cinemadelAPI(row.id)   //删除请求
                if(leg === 1){         //当为当前页最后一个时
                    --this.ymnum       //将请求的数据变为上一页
                    --this.num          //总页数减一
                }
                if(this.input3.trim() !== ''&&this.searchon){
                    this.tableData = await cinemasearAPI(this.input3.trim(),this.ymnum)
                }else{
                    this.tableData = await cinemaAPI(this.ymnum)    //再次请求数据
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
                this.tableData = await cinemasearAPI(this.input3.trim(),e)
            }else{
                this.tableData = await cinemaAPI(e)
            }
            this.num = this.tableData[0]?this.tableData[0].lng:1
            this.ymnum=e
        },
        submitForm(formName) {  //数据的修改
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let id = this.ruleForm.id
                    let index = this.tableData.findIndex(item => item.id === id)
                    for(let attr in this.tableData[index]){
                        this.tableData[index][attr] = this.ruleForm[attr]
                    }
                    let obj =  await cinemalterAPI(this.tableData[index])
                    if(this.input3.trim() !== ''&&this.searchon){
                        this.tableData = await cinemasearAPI(this.input3.trim(),this.ymnum)
                    }else{
                        this.tableData = await cinemaAPI(this.ymnum) 
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
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //拷贝
                    let data = {}
                    for(let attr in this.ruleForm2){
                        data[attr] = this.ruleForm2[attr]
                    }
                    data.id =+Date.now()
                    //发送添加请求
                    let obj =  await cinemaddAPI(data)
                    if(this.input3.trim() !== ''&&this.searchon){
                        this.tableData = await cinemasearAPI(this.input3.trim(),this.ymnum)
                    }else{
                        //发送刷新页面请求
                        this.tableData = await cinemaAPI(this.ymnum)
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
                this.tableData = await cinemaAPI(1)
                this.searchon = false
            }else{
                this.tableData = await cinemasearAPI(this.input3.trim())
                    this.searchon = true
            }
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
</style>