<template>
   <el-container>
        <el-container>
        <el-header style="height: 70px;">
            <div style="margin-top: 5px;width:40%;display: inline-block">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="seekfn"></el-button>
                </el-input>
            </div>
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
                        label="用户 ID"
                        width="100"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="用户姓名"
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
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="birthday"
                        align="center"
                        label="生日"
                        width="120"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sign"
                        align="center"
                        label="个人签名"
                        width="120"
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
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
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
                :page-count="num"
                @current-change="ymfn"
                :current-page = "ymnum"
                >
            </el-pagination>
        </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import {usersAPI} from '../../../api/api'
import {usersdelAPI} from '../../../api/api'
import {usersearAPI} from '../../../api/api'
import {MessageBox} from "element-ui";
export default {
    data() {
        return {
            num:1,
            ymnum:1,
            input3: '',
            tableData:[]
        }
    },
    created(){
        this.ymfn(1)
    },
    methods: {
        handleDelete(index, row) {       //删除
            MessageBox.confirm(
                "此操作将永久删除该用户人员的所有信息, 是否继续？",
                "提示"
            ).then(async value=>{
                let leg = this.tableData.length
                let obj = await usersdelAPI(row.id)   //删除请求
                if(leg === 1){         //当为当前页最后一个时
                    --this.ymnum       //将请求的数据变为上一页
                    --this.num          //总页数减一
                }
                if(this.input3.trim() !== ''){
                    this.tableData = await usersearAPI(this.input3.trim(),this.ymnum)
                    this.num = this.tableData[0]?this.tableData[0].lng:1
                }else{
                    this.tableData = await usersAPI(this.ymnum)    //再次请求数据
                }
                this.$message({
                    message: obj.type,
                    type: 'success'
                })
            })
        },
        async ymfn(e){     //页码数据请求
            if(this.input3.trim() !== ''){
                this.tableData = await usersearAPI(this.input3.trim(),e)
            }else{
                this.tableData = await usersAPI(e)
            }
            this.ymnum=e
            this.num = this.tableData[0]?this.tableData[0].lng:1
        },
        async seekfn(){      //搜索请求
            this.ymnum = 1
            if(this.input3.trim() === ''){
                this.tableData = await usersAPI(1)
            }else{
                this.tableData = await usersearAPI(this.input3.trim())
            }
            this.num = this.tableData[0]?this.tableData[0].lng:1
        },
    },
}
</script>

<style>
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
</style>