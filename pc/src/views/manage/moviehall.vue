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
                <el-button type="primary" @click="additionfn">添加影厅</el-button>
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
                        prop="hall_id"
                        label="影厅 ID"
                        width="100"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="cinema_name"
                        label="影院名称"
                        align="center"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="cinema_phone"
                        label="影院电话"
                        width="135"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="hall_name"
                        label="影厅名称"
                        align="center"
                        width="">
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
            <el-form-item label="类型"  prop="cinema_name">
                <el-select v-model="ruleForm.cinema_name" placeholder="请选择类型" >
                    <el-option v-for="(val,key) in cineocj" :label="val.name" :value="val.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="影厅名称" prop="hall_name">
                <el-input placeholder="请输入内容" v-model="ruleForm.hall_name">
                </el-input>
            </el-form-item>
            <el-form-item label-width="40px">
                <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="redact" v-if="onoff2">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <h2 style="color:black;margin-bottom:40px;margin-top:20px">修改信息</h2>
            <el-form-item label="影院"  prop="cinema_name">
                <el-select v-model="ruleForm2.cinema_name" placeholder="请选择影院" >
                    <el-option v-for="(val,key) in cineocj" :label="val.name" :value="val.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="影厅名称" prop="hall_name">
                <el-input placeholder="请输入内容" v-model="ruleForm2.hall_name">
                </el-input>
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
import {hallcinemaAPI} from '../../../api/api'
import {hallAPI} from '../../../api/api'
import {halldeldelAPI} from '../../../api/api'
import {hallalterAPI} from '../../../api/api'
import {halladdAPI} from '../../../api/api'
import {hallsearAPI} from '../../../api/api'
import {MessageBox} from "element-ui";
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
            cineocj:[],
            ruleForm: {      //修改数据
                hall_name: '',
                cinema_name: ''
            },
            ruleForm2: {     //添加数据
                hall_id:+Date.now(),
                hall_name: '',
                cinema_name: ''
            },
            rules: {        //添加数据和修改数据的验证
                hall_name: [
                    { required: true, message: '请输入影院名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                cinema_name: [
                    { required: true, message: '请输入影厅名称', trigger: 'blur' }
                ]
            }
        }
    },
    async created(){
        this.ymfn(1)
        this.cineocj = await hallcinemaAPI()
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
                let obj = await halldeldelAPI(row.hall_id)   //删除请求
                if(leg === 1){         //当为当前页最后一个时
                    --this.ymnum       //将请求的数据变为上一页
                    --this.num          //总页数减一
                }
                if(this.input3.trim() !== ''&&this.searchon){
                    this.tableData = await hallsearAPI(this.input3.trim(),this.ymnum)
                }else{
                    this.tableData = await hallAPI(this.ymnum)    //再次请求数据
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
                this.tableData = await hallsearAPI(this.input3.trim(),e)
            }else{
                this.tableData = await hallAPI(e)
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
                    let cinename = this.tableData[index].cinema_name
                    let [cineobj] = this.cineocj.filter(item => item.name === cinename)
                    this.tableData[index].cinema_id = cineobj.id
                    this.tableData[index].cinema_phone = cineobj.phone
                    console.log(cinename,this.tableData[index])
                    let obj =  await hallalterAPI(this.tableData[index])
                    if(this.input3.trim() !== ''&&this.searchon){
                        this.tableData = await hallsearAPI(this.input3.trim(),this.ymnum)
                    }else{
                        this.tableData = await hallAPI(this.ymnum) 
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
        additionfn(){  //添加影厅
            this.onoff2 = true
        },
        submitForm2(formName){   //确定添加影厅
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //拷贝
                    let data = {}
                    for(let attr in this.ruleForm2){
                        data[attr] = this.ruleForm2[attr]
                    }
                    let cinename = data.cinema_name
                    let [cineobj] = this.cineocj.filter(item => item.name === cinename)
                    data.cinema_id = cineobj.id
                    data.cinema_phone = cineobj.phone
                    data.hall_id = +Date.now()
                    //发送添加请求
                    let obj =  await halladdAPI(data)
                    if(this.input3.trim() !== ''&&this.searchon){
                        this.tableData = await hallsearAPI(this.input3.trim(),this.ymnum)
                    }else{
                        //发送刷新页面请求
                        this.tableData = await hallAPI(this.ymnum)
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
                this.tableData = await hallAPI(1)
                this.searchon = false
            }else{
                this.tableData = await hallsearAPI(this.input3.trim())
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