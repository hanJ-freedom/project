<template>
  <div id="about">
    <el-container style='height:100vh'>
      <el-header style='height:60px'>
          <el-row :gutter="100" justify="space-between" style="margin:0;height:100%">
            <el-col :span="10" style="float:left"><div class="grid-content bg-purple" style="display: flex;">
                <i class="icon-film-logo" style="font-size: 48px;margin-right: 5px;"></i>
                <span slot="title" style="font-size: 16px;font-weight: bolder">淘气电影</span>
              </div></el-col>
            <el-col :span="10" style="float:right"><div class="grid-content bg-purple">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div></el-col>
          </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <ul>
              <router-link :to="{name:'users'}" tag="li"><i class="el-icon-user-solid"></i><span>用户管理</span></router-link>
              <router-link :to="{name:'film'}" tag="li"><i class="el-icon-s-flag"></i><span>电影管理</span> </router-link>
              <router-link :to="{name:'cinema'}" tag="li"><i class="el-icon-video-camera-solid"></i><span>影院管理</span> </router-link>
              <router-link :to="{name:'moviehall'}" tag="li"><i class="el-icon-bangzhu"></i><span>影厅管理</span></router-link>
              <router-link :to="{name:'rowpiece'}" tag="li"><i class="el-icon-s-fold"></i><span>电影排片</span></router-link>
              <router-link :to="{name:'comment'}" tag="li"><i class="el-icon-s-comment"></i><span>评论管理</span></router-link>
              <router-link :to="{name:'order'}" tag="li"><i class="el-icon-s-ticket"></i><span>订单管理</span></router-link>
            </ul>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import '../assets/css/style.css'
export default {
  data() {
    return {
      ifnum: '1'
    }
  }
};
</script>

<style scoped>
html,
body,
#about {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* 头部header */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
/* 菜单栏aside */
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}
.el-aside ul{
  height: 100%;
  padding-top: 20px;
  box-sizing: border-box
}
li{
  height: 40px;
  line-height: 40px;
  cursor: pointer
}
.router-link-active{
  background-color: rgba(46, 140, 248, 0.808);
  color: #fff;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0
}
.el-main div{
  width: 100%;
  height:100%
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>