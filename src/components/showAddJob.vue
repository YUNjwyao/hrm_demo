<template>
    <div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>职位管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加职位</el-breadcrumb-item>
    </el-breadcrumb>
		<!-- 卡片视图区域 -->
    <el-card class="box-card">
		
      <!-- 添加和搜索 -->
      <el-row :gutter="10">
        <el-col :span="12"
          ><div>
            职位名称：<el-input
              placeholder="请输入内容"
              v-model="queryInfo.name"
            ></el-input></div
        ></el-col>
        <el-col :span="12"
          ><div>
            详细描述：<el-input placeholder="请输入内容" v-model="queryInfo.remark"></el-input>
            </div>
        </el-col>
      </el-row>
	  
	  <el-row :gutter="10" class='el-row-addjob'> 
		  <el-col :span='2'>
			  <el-button round type="primary" @click="saveOne()">添加</el-button>
		  </el-col>
		  <el-col :span="2">
			  <el-button type="danger" icon="el-icon-delete" circle @click="deleteAll()"></el-button>
		  </el-col>
	  </el-row>
    </el-card>
	</div>
</template>

<script>
export default {
    data(){
    return{
      queryInfo:{
        id:'',
        name:'',
        remark:'',
      }

    }
  },
  methods : {
    //添加用户
    async saveOne () {
      const {data : res } = await this.$http.post('/api/job/saveOne',
        this.queryInfo
      )
      console.log(this.queryInfo),
      console.log(res);
    },
    //清空当前页面输入框
    deleteAll(){
      this.queryInfo.name='',
      this.queryInfo.remark=''
    }
  },
};
</script>

<style lang="less" scoped>
.el-input{
  width: 400px;
}
.el-row{
  margin-bottom: 15px;
}
</style>