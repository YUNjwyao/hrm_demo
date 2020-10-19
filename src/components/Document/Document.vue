<template>
  <div class="employee">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>当前位置：文档管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">文档查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询输入框 -->
    <el-card>
       
      <el-row>
        文档名称：
		<el-input></el-input>
		文档内容: 
		<el-input></el-input>
        <el-button>搜索</el-button>
        <el-button>删除</el-button>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="标题" width="120">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="sex" label="创建时间" width="120"> </el-table-column>
        <el-table-column prop="phone" label="创建人" width="120">
        </el-table-column>
        <el-table-column prop="sex" label="描述" width="120"> </el-table-column>
        <el-table-column prop="email" label="操作" width="120">
        </el-table-column>
        <el-table-column prop="job" label="预览" width="120"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "经理",
        },
        {
          value: "选项2",
          label: "职员",
        },
      ],
      optionsSex: [
        {
          value: "选项1",
          label: "男",
        },
        {
          value: "选项2",
          label: "女",
        },
      ],
      optionsDoor: [
        {
          value: "选项1",
          label: "技术部",
        },
        {
          value: "选项2",
          label: "运营部",
        },
      ],
      tableData: [
        {
          name: "文件哈",
          sex: "2019年4月6日",
          phone: "songyq",
          email: "这是一个文件",
          job: "经理",
          education: "本科",
          IdNumber: "500213213123",
          door: "技术部",
          address: "上海市普陀区金沙江路 1518 弄",
          date: "2016-12-03",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
    };
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
      this.multipleSelection = val;
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
</style>
