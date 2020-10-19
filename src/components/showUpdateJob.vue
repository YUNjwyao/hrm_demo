<template>
  <!-- 面包屑导航区域 -->

  <!-- 卡片视图区域 -->
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>职位管理</el-breadcrumb-item>
      <el-breadcrumb-item>职位查询</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加和搜索 -->
    <el-row :gutter="10">
      <el-col :span="12"
        ><div>
          职位名称：<el-input
            label="职位名称"
            placeholder="请输入内容"
            :class="input_job"
            v-model="queryInfo.name"
            clearable
            @clear="getJobList()"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="3"
        ><div>
          <el-button
            icon="el-icon-search"
            @click="searchJob()"
          ></el-button></div
      ></el-col>
      <el-col :span="3"
        ><div>
          <el-button
            icon="el-icon-delete"
            @click.prevent="deleteJob()"
          ></el-button></div
      ></el-col>
    </el-row>

    <!-- 职位列表 -->

    <el-table
      :data="jobList"
      stripe
      style="width: 100%"
      border=""
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="50px"> </el-table-column>
      <el-table-column prop="name" label="职位名称" width="180px">
      </el-table-column>
      <el-table-column prop="remark" label="详细信息" width="180px">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            v-model="queryInfo.id"
            @click="test(scope.row)"
          ></el-button>
          <!-- 修改对话框界面 -->
          <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
            <div>
              职位名称：<el-input
                label="职位名称"
                v-model="updateInfo.name"
              ></el-input>
            </div>

            <div class="job_div">
              职位描述：<el-input
                label="职位描述"
                v-model="updateInfo.remark"
              ></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateJob()">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      input_job: "",
      //获取职位列表的参数对象
      queryInfo: {
        id: "",
        name: "",
        remark: "",
      },
      //职位列表
      jobList: {},
      multipleSelection: [],
      dialogVisible: false,
      updateInfo: {
        id: "",
        name: "",
        remark: "",
      },
    };
  },
  created() {
    this.getJobList();
  },
  methods: {
    async searchJob() {
      const { data: res } = await this.$http.post(
        "/api/job/queryByName",
        this.queryInfo
      );
      console.log(this.queryInfo.name);
      console.log(res);
      if (res.operationResult === "SUCCESS") {
        this.jobList = res.queryData;
      }
    },
    async deleteJob() {
      if (this.multipleSelection) {
        //这个可能有问题
        const { data: res } = await this.$http.post("/api/job/removeByName", {
          name: this.multipleSelection[0].name,
        });
        this.getJobList();
      }
    },

    async getJobList() {
      const { data: res } = await this.$http.get("/api/job/queryAll", {
        param: this.queryInfo,
      });
      if (res.operationResult === "SUCCESS") {
        this.jobList = res.queryData;
      }
    },
    async updateJob() {
      this.dialogVisible = true;
      console.log(this.updateInfo.id);

      const { data: res } = await this.$http.post(
        "/api/job/updateOne",
        this.updateInfo
      );
      if (res.operationResult === "SUCCESS") {
        this.getJobList();
        console.log(this.updateInfo);
      }
      this.dialogVisible = false;
      
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
</style>
