<template>
<div>
    <el-container>
        <el-header style="height: 70px;">
            <div style="margin-top: 5px;width:40%;display: inline-block">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <el-row style="width:20%;display: inline-block">
                <el-button type="primary">添加电影</el-button>
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
                        align="center">
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
                >
            </el-pagination>
        </el-footer>
    </el-container>
    <div id="redact" v-if="onoff">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
                    <el-option label="国语" value="guoyu"></el-option>
                    <el-option label="英语" value="yingyu"></el-option>
                    <el-option label="韩语" value="hanyu"></el-option>
                    <el-option label="日语" value="riyu"></el-option>
                    <el-option label="粤语" value="ayu"></el-option>
                    <el-option label="泰语" value="taiyu"></el-option>
                    <el-option label="阿拉伯语" value="alaboyu"></el-option>
                    <el-option label="朝鲜语" value="chaoxianyu"></el-option>
                    <el-option label="意大利语" value="yidaliyu"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型"  prop="genre">
                <el-select v-model="ruleForm.genre" placeholder="请选择类型">
                    <el-option label="动漫" value="dongman"></el-option>
                    <el-option label="科幻" value="kehuan"></el-option>
                    <el-option label="剧情" value="juqing"></el-option>
                    <el-option label="言情" value="yanqing"></el-option>
                    <el-option label="喜剧" value="xiju"></el-option>
                    <el-option label="爱情" value="aiqing"></el-option>
                    <el-option label="动作" value="dongzuo"></el-option>
                    <el-option label="冒险" value="maoxian"></el-option>
                    <el-option label="青春" value="qingchun"></el-option>
                    <el-option label="悬疑" value="yuanyi"></el-option>
                    <el-option label="恐怖" value="kongbu"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电影简介" prop="intro">
                <el-input type="textarea" v-model="ruleForm.intro"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    
</div>
    
</template>

<script>
import {filmsAPI} from '../../../api/api'
import {filmsdelAPI} from '../../../api/api'
export default {
    data() {
        return {
            input3: '',
            tableData: [],
            num:0,
            ymnum:1,
            onoff:false,
            ruleForm: {
                name: '',
                director: '',
                protagonist: '',
                date: '',
                time: 0,
                language: '',
                intro: '',
                genre:''
            },
            rules: {
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
            this.ruleForm = row
            this.ruleForm.date = new Date(row.date)
            this.onoff = true
        },
        async handleDelete(index, row) {       //删除
            let leg = this.tableData.length
            await filmsdelAPI(row.id)   //删除请求
            if(leg === 1){         //当为当前页最后一个时
                --this.ymnum       //将请求的数据变为上一页
                --this.num          //总页数减一
            }
            this.tableData = await filmsAPI(this.ymnum)    //再次请求数据
            this.$message({
                message: '删除成功',
                type: 'success'
            })
        },
        async ymfn(e){     //数据请求
            this.tableData = await filmsAPI(e)
            this.num = this.tableData[0].lng
            this.ymnum=e
        },
        submitForm(formName) {  //数据的修改
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    this.$message({
                        message: '请正确填写',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {   //取消
            this.$refs[formName].resetFields();
            this.onoff = false
        }
    },
    computed:{
        async sum(){   //获取页码和第一次数据请求
            this.tableData = await filmsAPI(1)
            if(this.tableData[0]){
                this.num = this.tableData[0].lng
            }
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
#redact{
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
    width: 30%;
    height: 90%;
    border: 1px rgb(146, 119, 119) solid;
    padding:20px ;
    background: #fff;
}
</style>