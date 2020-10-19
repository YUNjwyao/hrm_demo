<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户查询</el-breadcrumb-item>
      </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      
      

      <!-- 添加和搜索 -->
      <template>
        <el-row :gutter="10">
          <el-col :span="12"
            ><div>
              用户名：<el-input
                label="用户名"
                placeholder="请输入内容"
                v-model="queryInfo.userName"
                class="input-with-select"
                clearable
                @clear="getUserList()"
              >
              </el-input></div
          ></el-col>
          <el-col :span="8"
            ><div>
              用户状态：<el-select
                v-model="select"
                slot="prepend"
                placeholder="全部"
              >
                <el-option label="管理员" value="1"></el-option>
                <el-option label="普通用户" value="2"></el-option>
              </el-select></div
          ></el-col>
          <el-col :span="2"
            ><div>
              <!-- {{scope.row}}  -->
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchUser(queryInfo)"
              >
              </el-button></div
          ></el-col>
          <el-col :span="2"
            ><div>
              <el-button
                slot=""
                icon="el-icon-delete"
                @click="deleteUser()"
              ></el-button></div
          ></el-col>
        </el-row>
      </template>

      <!-- 用户列表 -->

      <el-table
        :data="userList"
        stripe
        style="width: 100%"
        border=""
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="50px"> </el-table-column>
        <el-table-column prop="loginName" label="登录名" width="180"
          >55555
        </el-table-column>
        <el-table-column prop="password" label="密码" width="180">
        </el-table-column>
        <el-table-column prop="userName" label="用户名"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>
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
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="40%"
            >
              <div>
                用户名：<el-input
                  label="用户名"
                  v-model="updateInfo.userName"
                ></el-input>
              </div>

              <div class="job_div">
                用户状态：<el-select
                  v-model="scope.row.status"
                  slot="prepend"
                  placeholder="全部"
                >
                  <el-option label="管理员" value="1"></el-option>
                  <el-option label="普通用户" value="2"></el-option>
                </el-select>
              </div>
              <div class="job_div">
                登录名：<el-input
                  label="登录名"
                  
                  v-model="updateInfo.loginName"
                ></el-input>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser()"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryInfo.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: "",
      // 默认用户信息
      queryInfo: {
        userName: "",
        pageNum: 1,
        pageSize: 10,
        total: "100",
      },
      updateInfo: {
        userName: "",
        id: "",
        loginName: "",
        status: "",
      },
      userList: [],
      multipleSelection: [],
      dialogVisible: false,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 监听pagesize的变化
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    // 监听页码值的变化
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },
    async searchUser(user) {
      const { data: res } = await this.$http.get(
        `/api/user/users?userName=${user.userName}`
      );
      if (res.operationResult === "SUCCESS") {
        this.userList = res.queryData.list;
        console.log(`/api/user/users?userName=${user.userName}`);
        console.log(this.userList);
      }
    },
    async gettotal() {
      const { data: res } = await this.$http.get(
        `/api/user/users?pageSize=${1000}&pageNum=${this.queryInfo.pageNum}`
      );
      if (res.operationResult === "SUCCESS") {
        this.queryInfo.total = res.queryData.list.length;
        console.log(this.queryInfo.total);
      }
    },
    async getUserList() {
      this.gettotal();
      const { data: res } = await this.$http.get(
        `/api/user/users?pageSize=${this.queryInfo.pageSize}&pageNum=${this.queryInfo.pageNum}`
      );
      if (res.operationResult === "SUCCESS") {
        this.userList = res.queryData.list;
        console.log(res);
      }
    },
    async deleteUser() {
      if (this.multipleSelection) {
        var ids = "";
        for (var i = 0; i < this.multipleSelection.length; i++) {
          ids += this.multipleSelection[i].id + "-";
        }
        if (ids.length > 0) {
          ids = ids.substr(0, ids.length - 1);
        }
        console.log(ids);
        //这个可能有问题
        const { data: res } = await this.$http.delete(
          `/api/user/delete/${ids}`
        );
        this.getUserList();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    async test(job) {
      this.dialogVisible = true;
      this.updateInfo.id = job.id;
      const { data: res1 } = await this.$http.get(
        `/api/user/query/${this.updateInfo.id}`
      );
      if (res1.operationResult === "SUCCESS") {
        console.log(res1)
        this.updateInfo.userName = res1.queryData.userName;
        this.updateInfo.status = res1.queryData.status;
        this.updateInfo.loginName = res1.queryData.loginName;
        console.log(job.id);
      }
      
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    async updateUser() {
      
      this.dialogVisible = true;
      console.log(this.updateInfo.id);
      const { data: res } = await this.$http.put(
        "/api/user/update",
        this.updateInfo
      );
      if (res.operationResult === "SUCCESS") {
        this.getUserList();
        console.log(this.updateInfo);
      }
      this.dialogVisible = false;
      
    },
  },
};
</script>

<style  scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input {
  width: 400px;
}
.el-breadcrumb {
  margin: 15px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  margin: 15px 0;
}
.job_div {
  margin-top: 10px;
}
</style>
