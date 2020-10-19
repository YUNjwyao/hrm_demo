<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门查询</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 添加和搜索 -->
      <el-row :gutter="10">
        <el-col :span="12"
          ><div>
            部门名称：<el-input
              label="部门名称"
              placeholder="请输入内容"
              class="input_dept"
              v-model="queryInfo.name"
              clearable
              @clear="getDeptList()"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="3"
          ><div>
            <el-button
              icon="el-icon-search"
              @click="searchDept()"
            ></el-button></div
        ></el-col>
        <el-col :span="3"
          ><div>
            <el-button
              slot=""
              icon="el-icon-delete"
              @click.prevent="deleteDept()"
            ></el-button></div
        ></el-col>
      </el-row>
      <!-- 部门列表 -->
      <el-table
        :data="deptList"
        stripe
        style="width: 100%"
        border=""
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="50px"> </el-table-column>
        <el-table-column prop="name" label="部门名称" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="详细信息" width="180">
        </el-table-column>
        <el-table-column label="操作" class="edit">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-model="queryInfo.id"
              @click="test(scope.row)"
            ></el-button>
            <!-- 修改对话框界面 -->
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="40%"
            >
              <div>
                部门名称：<el-input
                  label="职位名称"
                  v-model="updateInfo.name"
                ></el-input>
              </div>

              <div class="job_div">
                部门描述：<el-input
                  label="职位描述"

                  v-model="updateInfo.remark"
                ></el-input>
              </div>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDept()"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        name: "",
        id: "",
        remark: "",
      },
      deptList: {},
      multipleSelection: [],
      dialogVisible: false,
      updateInfo:{
        name: "",
        id: "",
        remark: "",
      }
    };
  },
  created() {
    this.getDeptList();
  },
  methods: {
    async getDeptList() {
      const { data: res } = await this.$http.get("/api/dept/queryAllDept", {
        param: this.queryInfo,
      });
      if (res.operationResult === "SUCCESS") {
        this.deptList = res.queryData;
      }
    },
    async searchDept() {
      const { data: res } = await this.$http.post(
        "/api/dept/queryDept",
        this.queryInfo
      );
      console.log(this.queryInfo.name);
      console.log(res);
      if (res.operationResult === "SUCCESS") {
        this.deptList = res.queryData;
      }
    },
    async deleteDept() {
      if (this.multipleSelection) {
        //这个可能有问题
        const { data: res } = await this.$http.post("/api/dept/removeByName", {
          name: this.multipleSelection[0].name,
        });
        this.getDeptList();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    test(job) {
      this.dialogVisible = true;
      this.updateInfo.id = job.id;
      this.updateInfo.name = job.name;
      this.updateInfo.remark = job.remark;
      },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    async updateDept() {
      this.dialogVisible = true;
      // console.log(this.queryInfo.id);
      const { data: res } = await this.$http.post(
        "/api/dept/updateOne",
        this.updateInfo
      );
      if (res.operationResult === "SUCCESS") {
        this.getDeptList();
        // console.log(this.queryInfo);
      }
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang='less' scoped>
.el-input {
  width: 400px;
}
.job_div {
  margin-top: 10px;
}
.edit {
  margin: 0 auto;
  right: 0;
}
</style>
