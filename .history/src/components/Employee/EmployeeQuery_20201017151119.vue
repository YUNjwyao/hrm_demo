<template>
  <div class="employee">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>当前位置：员工管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">员工查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询输入框 -->
    <el-card>
      <el-row>
        职位：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        姓名：
        <el-input v-model="input"></el-input>
        身份证号码：
        <el-input v-model="input"></el-input>
      </el-row>
      <el-row>
        性别：
        <el-select v-model="value" placeholder="请选择性别">
          <el-option
            v-for="item in optionsSex"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        手机：
        <el-input v-model="input"></el-input>
        所属部门：
        <el-select v-model="value" placeholder="--部门选择--">
          <el-option
            v-for="item in optionsDoor"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button @click="searchEmpolyee">搜索</el-button>
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
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="50">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="50"> </el-table-column>
        <el-table-column prop="phone" label="手机号码" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="120">
        </el-table-column>
        <el-table-column prop="job" label="职位" width="80"> </el-table-column>
        <el-table-column prop="education" label="学历" width="50">
        </el-table-column>
        <el-table-column prop="IdNumber" label="身份证号码" width="120">
        </el-table-column>
        <el-table-column prop="door" label="部门" width="120">
        </el-table-column>
        <el-table-column prop="address" label="联系地址" width="200">
        </el-table-column>
        <el-table-column prop="date" label="建档日期" width="120">
        </el-table-column>
        <el-table-column label="操作" width="50"> </el-table-column>
      </el-table>
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
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
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
          name: "王小虎",
          sex: "男",
          phone: "1522369825",
          email: "1173131490@qq.com",
          job: "经理",
          education: "本科",
          IdNumber: "500213213123",
          door: "技术部",
          address: "上海市普陀区金沙江路 1518 弄",
          date: "2016-12-03",
        },
        {
          name: "张三",
          sex: "女",
          phone: "1522369825",
          email: "1173131490@qq.com",
          job: "经理",
          education: "本科",
          IdNumber: "500213213123",
          door: "技术部",
          address: "重庆市南岸区",
          date: "2016-12-03",
        },
        {
          name: "李四",
          sex: "男",
          phone: "1522369825",
          email: "1173131490@qq.com",
          job: "经理",
          education: "本科",
          IdNumber: "500213213123",
          door: "技术部",
          address: "四川省成都市",
          date: "2016-12-03",
        },
      ],
      multipleSelection: [],
      // 默认用户信息
      userInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
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
    async searchEmpolyee(){
      const {data: res} = await this.$http.get('/api/employee/queryByCondition')
      console.log (res)
    }
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
.el-pagination {
  margin: 0 auto;
}
</style>
