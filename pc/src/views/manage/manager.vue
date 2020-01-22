<template>
  <div>
    <el-container>
        <el-container>
        <el-header style="height: 70px;">
            <div style="margin-top: 5px;width:40%;display: inline-block">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="seekfn"></el-button>
                </el-input>
            </div>
            <el-row style="width:20%;display: inline-block">
                <el-button type="primary" @click="additionfn" v-if="admid === 1">添加管理人员</el-button>
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
                        label="管理员 ID"
                        width="100"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="管理员姓名"
                        align="center"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="性别"
                        width="75"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="birthday"
                        align="center"
                        label="生日"
                        width="150"
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
                            @click="handleEdit(scope.$index, scope.row)"
                            v-if="admid === scope.row.id"
                            >编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-if="admid === 1&&admid !== scope.row.id"
                            >删除</el-button>
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
    </el-container>
    <div class="redact" v-if="onoff">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h2 style="color:black;margin-bottom:20px">修改信息</h2>
            <el-form-item label="管理员昵称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="性别"  prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="生日" required>
                <el-col :span="11">
                    <el-form-item prop="birthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="15px">
                <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="redact" v-if="onoff2">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <h2 style="color:black;margin-bottom:20px">添加人员</h2>
            <el-form-item label="管理员昵称" prop="name">
                <el-input v-model="ruleForm2.name"></el-input>
            </el-form-item>
            <el-form-item label="性别"  prop="sex">
                <el-select v-model="ruleForm2.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm2.phone"></el-input>
            </el-form-item>
            <el-form-item label="生日" required>
                <el-col :span="11">
                    <el-form-item prop="birthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm2.birthday" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="15px">
                <el-button type="primary" @click="submitForm2('ruleForm2')">确定添加</el-button>
                <el-button @click="resetForm2('ruleForm2')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import {manageAPI} from '../../../api/api';
import {managedelAPI} from '../../../api/api';
import {manageralterAPI} from '../../../api/api';
import {manageraddAPI} from '../../../api/api';
import {managersearAPI} from '../../../api/api';
import { MessageBox} from "element-ui";
export default {
    data() {
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
            num:1,
            ymnum:1,
            admname:'',
            admid:'',
            admpass:'',
            onoff:false,
            onoff2:false,
            ruleForm: {
                id:6,
                name:"小哈",
                password:"123456",
                sex:"女",
                phone: 13666666666,
                birthday:"2000-9-9",
                },
            ruleForm2: {
                id:Date.now(),
                name:'',
                password:"123456",
                sex:"",
                phone: '',
                birthday:"",
            },
            rules: {        //添加数据和修改数据的验证
                name: [
                    { required: true, message: '请输入管理员名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' },
                    { validator : valid ,trigger: 'blur'}
                ],
                birthday: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        handleEdit(index, row) {       //编辑
            for(let attr in  row){
                this.ruleForm[attr] = row[attr]
            }
            this.ruleForm.birthday = new Date(row.birthday)
            this.admpass = row.password
            this.onoff = true
        },
        handleDelete(index, row) {       //删除
            MessageBox.confirm(
                "此操作将永久删除该管理人员的所有信息, 是否继续？",
                "提示"
            ).then(async value=>{
                let leg = this.tableData.length
                let obj = await managedelAPI(row.id)   //删除请求
                if(leg === 1){         //当为当前页最后一个时
                    --this.ymnum       //将请求的数据变为上一页
                    --this.num          //总页数减一
                }
                if(this.input3.trim() !== ''){
                    this.tableData = await managersearAPI(this.input3.trim(),this.ymnum)
                }else{
                    this.tableData = await manageAPI(this.ymnum)    //再次请求数据
                }
                this.num = this.tableData[0]?this.tableData[0].lng:1
                this.$message({
                    message: obj.type,
                    type: 'success'
                })
            })
            
        },
        async ymfn(e){     //页码数据请求
            if(this.input3.trim() !== ''){
                this.tableData = await managersearAPI(this.input3.trim(),e)
            }else{
                this.tableData = await manageAPI(e)
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
                    let dates = this.tableData[index].birthday
                    let year = dates.getFullYear()
                    let month = dates.getMonth() + 1
                    let day = dates.getDate()
                    this.tableData[index].birthday = year + '-' + month + '-' + day
                    let obj =  await manageralterAPI(this.tableData[index])
                    if(this.input3.trim() !== ''){
                        this.tableData = await managersearAPI(this.input3.trim(),this.ymnum)
                    }else{
                        this.tableData = await manageAPI(this.ymnum)
                    } 
                    this.onoff = false
                    this.$message({
                        message: obj.type,
                        type: 'success'
                    })
                    index = this.tableData.findIndex(item => item.id === this.admid)
                    if(this.admpass !== this.tableData[index].password){
                        sessionStorage.removeItem('admid')
                        sessionStorage.removeItem('token')
                        this.$router.push('/')
                        this.$alert('密码已修改,请重新登录', '警告', {
                            confirmButtonText: '确定',
                            callback: action => {}
                        });
                    }
                } else {
                    this.$message({
                        message: '请正确填写',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        additionfn(){  //添加管理人员
           this.onoff2 = true
        },
        submitForm2(formName){   //确定添加新的管理员
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //拷贝
                    let data = {}
                    for(let attr in this.ruleForm2){
                        data[attr] = this.ruleForm2[attr]
                    }
                    //改变时间
                    let dates = data.birthday
                    let year = dates.getFullYear()
                    let month = dates.getMonth() + 1
                    let day = dates.getDate()
                    data.birthday = year + '-' + month + '-' + day
                    //发送添加请求
                    let obj =  await manageraddAPI(data)
                    if(this.input3.trim() !== ''){
                        this.tableData = await managersearAPI(this.input3.trim(),this.ymnum)
                    }else{
                        //发送刷新页面请求
                        this.tableData = await manageAPI(this.ymnum)
                    }
                    //修改页码
                    this.num = this.tableData[0]?this.tableData[0].lng:1
                    console.log(1)
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
        resetForm2(formName){   //取消添加新的管理员
            this.onoff2 = false
            this.$refs[formName].resetFields();
        },
        async seekfn(){      //搜索请求
            this.ymnum = 1
            if(this.input3.trim() === ''){
                this.tableData = await manageAPI(1)
                this.searchon = false
            }else{
                this.tableData = await managersearAPI(this.input3.trim())
                if(this.tableData.length){
                    this.searchon = true
                }else{
                    this.num = 1
                }
            }
            this.num = this.tableData[0]?this.tableData[0].lng:1
        },
        async resetForm(formName) {   //取消修改
            this.onoff = false
        }
    },
    computed: {
        async sum(){   //初次的数据请求和页码请求
            this.tableData = await manageAPI(1)
            this.num = this.tableData[0]?this.tableData[0].lng:1
            let admin = sessionStorage.getItem('admid')
            this.admname = JSON.parse(admin).name
            this.admid = JSON.parse(admin).id
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
    height: 80%;
    border: 1px rgb(146, 119, 119) solid;
    padding:30px 20px 0 20px;
    background: #fff;
}

</style>