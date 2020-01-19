<template>
  <div class="login">
    <div class="box">
      <div class="content">
        <h3>影院售票管理系统</h3>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="50px"
          class="demo-ruleForm"
          display="left"
        >
          <el-form-item label="用户" prop="name">
            <el-input type="input" v-model="ruleForm.name" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :plain="true">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {loginAPI} from '../../api/api'
export default {
  data() {
    //element 自带验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else{
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        checkPass: ""
      },
      rules: {
        name: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await loginAPI({name:this.ruleForm.name,password:this.ruleForm.checkPass})
          if(data.code === 0){
              this.$message({
              message:data.type,
              type: 'success'
            });
            this.$router.push('./about')
          }else{
            this.$message.error(data.type);
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style >
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/register.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 0 8px 8px #ccc;
}
h3 {
  margin-bottom: 40px;
  font-size: 36px;
  letter-spacing: 2px;
  color: #888;
  text-align: center;
}
.content-user {
  margin-bottom: 22px;
}
.content-user-txt {
  width: 50px;
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.content-user-input {
  position: relative;
  font-size: 14px;
  margin-left: 50px;
  box-sizing: border-box;
}
.content-user-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.register {
  margin-left: 10px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>