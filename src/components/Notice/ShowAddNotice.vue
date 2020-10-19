<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>当前位置：公告管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">添加公告</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
        <el-row>
        <el-col :span="8">
          公告标题：
          <el-input v-model="addForm.title"></el-input>
        </el-col>
      </el-row>
      公告内容：
      <el-row>
        <el-col :span="16">
          <el-input
            type="textarea"
            rows="10"
            v-model="addForm.content"
          ></el-input>
        </el-col>
      </el-row>
      <el-button @click="addNotice" type="primary">添加</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加表单对象
      addForm: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    async addNotice() {
      const { data: res } = await this.$http.post(
        "/api/notice/addNotice",
        this.addForm
	  );
    console.log(res)
     if(res.operationResult!=="SUCCESS"){
        this.$message.error('添加失败');
      }
      this.$message.success("添加成功");
    },
    reset(){
        this.$refs.addFormRef.resetFields();
      }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
}
.el-button{
  margin-top: 20px;
}
.el-row{
  margin-top: 20px;
}
</style>
