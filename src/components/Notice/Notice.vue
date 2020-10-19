<template>
  <div class="employee">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>当前位置：公告管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">公告查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询输入框 -->
    <el-card>
      <el-row>
        公告名称：
        <el-input v-model="notice.title"></el-input>
        公告内容:
        <el-input v-model="notice.content"></el-input>
        <el-button @click="searchNotice()">搜索</el-button>
        <el-button @click="deleteNotice">删除</el-button>
      </el-row>
    </el-card>
    <!-- Table表格 -->
    <el-card>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column prop="title" label="公告名称" width="200">
        </el-table-column>
        <el-table-column prop="content" label="公告内容" width="250">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="150">
        </el-table-column>
        <el-table-column prop="" label="公告人" width="150"> </el-table-column>
        <el-table-column prop="email" label="操作" width="150">
          <template slot-scope="scope">
            <img
              src="../../assets/images/update.gif"
              alt=""
              @click="updateNotice(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="job" label="预览" width="150">
          <template slot-scope="scope">
            <img
              src="../../assets/images/prev.gif"
              alt=""
              @click="preView(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 更新公告框 -->
    <el-dialog title="更新公告" :visible.sync="noticeDialogVisible" width="70%">
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
            class="area"
            type="textarea"
            v-model="addForm.content"
          ></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noticeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNotice">更新</el-button>
      </span>
    </el-dialog>
    <!-- 预览框 -->
    <el-dialog title="预览公告" :visible.sync="preViewDialogVisible" width="50%">
      <span>{{ addForm.title }}</span>
      <span>{{ addForm.content }}</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //公告查询数据
      notice: {
        title: "",
        content: "",
      },
      tableData: [],
      multipleSelection: [],
      title: "",
      noticeDialogVisible: false,
      preViewDialogVisible: false,
      // 添加表单对象
      addForm: {
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.getNotice();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.title = val[0].title;
      this.multipleSelection = val;
    },
    async getNotice() {
      const { data: res } = await this.$http.post(
        "/api/notice/queryByCondition",
        {}
      );
      this.tableData = res.queryData.list;
    },
    //搜索公告
    async searchNotice() {
      const { data: res } = await this.$http.post(
        "/api/notice/queryByCondition",
        this.notice
      );
      this.$message.success("搜索成功");
      this.tableData = res.queryData.list;
    },
    // 删除公告
    async deleteNotice() {
      const { data: res } = await this.$http.post(
        "/api/notice/deleteByCondition",
        {
          title: this.title,
        }
      );
      console.log(res);
       if(res.operationResult!=="SUCCESS"){
        this.$message.error('删除失败');
      }
      this.$message.success("删除成功");
      this.getNotice();
    },
    //获取修改数据
    async updateNotice(row) {
      this.noticeDialogVisible = !this.noticeDialogVisible;
      console.log(row);
      const { data: res } = await this.$http.post(
        "/api/notice/queryByCondition",
        {
          title: row.title,
        }
      );
      console.log(res);
      this.addForm = res.queryData.list[0];
    },
    // 更新数据
    async editNotice() {
      const { data: res } = await this.$http.post(
        "/api/notice/updateById",
        this.addForm
      );
       if(res.operationResult!=="SUCCESS"){
        this.$message.error('更新失败');
      }
      this.$message.success("更新成功");
      this.noticeDialogVisible = false;
      this.getNotice();
    },
    //预览
    async preView(row) {
      this.preViewDialogVisible = !this.preViewDialogVisible;
      console.log(row);
      const { data: res } = await this.$http.post(
        "/api/notice/queryByCondition",
        {
          title: row.title,
        }
      );
      console.log(res);
      this.addForm = res.queryData.list[0];
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    setRightDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
}
.el-input {
  width: 250px;
}
.el-row {
  margin-top: 10px;
}
.el-button {
  margin-left: 10px;
}
.area {
  margin-top: 20px;
  width: 500px;
  height: 300px;
}
</style>
