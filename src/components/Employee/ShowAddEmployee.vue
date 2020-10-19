<template>
  <div class="addEmployee">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>当前位置：员工管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">添加员工</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-card>
      <el-form :model="addForm" ref="addFormRef" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            
              <el-form-item label="身份证号码">
              <el-input v-model="addForm.cardId"></el-input>
            </el-form-item>
    
            
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            性别：
            <div class="options">
              <el-select
                v-model="addForm.sex"
                slot="prepend"
                placeholder="请选择性别"
              >
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            职位：
            <div class="options">
              <el-select
                v-model="addForm.jobId"
                slot="prepend"
                placeholder="请选择职位"
              >
                <el-option label="管理员" value="1"></el-option>
                <el-option label="普通用户" value="2"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="学历">
              <el-input v-model="addForm.education"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="手机">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话">
              <el-input v-model="addForm.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="政治面貌">
              <el-input v-model="addForm.party"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ号码">
              <el-input v-model="addForm.qqNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系地址">
              <el-input v-model="addForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码">
              <el-input v-model="addForm.postCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="出生日期">
              <el-input v-model="addForm.birthday"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族">
              <el-input v-model="addForm.race"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="所学专业">
              <el-input v-model="addForm.speciality"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="爱好">
              <el-input v-model="addForm.hobby"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="addForm.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            所属部门：
            <div class="options">
              <el-select
                v-model="addForm.deptId"
                slot="prepend"
                placeholder="选择部门"
              >
                <el-option label="技术部" value="1"></el-option>
                <el-option label="管理部" value="2"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row> </el-row>
      </el-form>
      <el-button type="primary" @click="addFormData">添加</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加表单对象
      addForm: {
        jobId: "",
        name: "",
        sex: "",
        deptId: "",
        cardId: "",
        phone: "",
        education: "",
        email: "",
        tel: "",
        party: "",
        qqNum: "",
        address: "",
        postCode: "",
        birthday: "",
        race: "",
        speciality: "",
        hobby: "",
        remark: ""
      }
    };
  },
  methods: {
    async addFormData(){
      const { data:res } = await this.$http.post(
        "/api/employee/addEmployee",
       this.addForm
      );
      console.log(res)
       if(res.operationResult!=="SUCCESS"){
        this.$message.error('添加失败');
      }
      this.$message.success("添加成功");
    },
    setRets(){
        this.$refs.addFormRef.resetFields();
      }
  }
};
</script>

<style lang="less" scoped>

.el-card {
  margin-top: 20px;
}
.el-input {
  width: 200px;
  height: 30px;
}
.el-select {
  margin-bottom: 20px;
}
.el-button {
  margin-left: 20px;
}

</style>
