<template>
  <div>
    <!-- @close接收了子组件关闭的通知，及时更新showadd的属性值 -->
    <UserAdd v-if="showAdd" @closeAdd="handleAddCloser"></UserAdd>
    <UserEdit v-if="showEdit" :item="editMessage" @closeEdit="handleEditCloser"></UserEdit>
    <el-row>
      <el-col class="textIput">
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col class="btnButton">
        <el-button type="primary" @click="searchHandler">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      :height="getHeight()"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" sortable width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" sortable width="100">
        <!-- 通过插槽来修改组件内部的数据 -->
        <template slot-scope="scope">{{ scope.row.sex | formatSex }}</template>
      </el-table-column>
      <el-table-column prop="date" label="生日" sortable width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :page-count="pageCount"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>
<script>
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";
export default {
  components: {
    UserAdd,
    UserEdit
  },
  data() {
    return {
      showEdit: false,
      showAdd: false,
      name: "",
      pageNum: 1, //页码
      pageSize: 15, //每页条数
      total: 0, //数据总数
      tableData: [], //数据数组
      editMessage: {}
    };
  },
  //过滤器 转换男女
  filters: {
    formatSex(val) {
      return val == "0" ? "男" : "女";
    }
  },
  computed: {
    //计算页数
    pageCount() {
      return Math.floor(this.total / this.pageSize);
    }
  },
  methods: {
    //来自子组件的通知，及时更新showadd的属性值
    handleAddCloser(message) {
      if ("success"===message) {
        this.$message({
          type: "success",
          message: "数据添加成功"
        });
      }
      this.showAdd = false;
      this.getList();
    },
    handleEditCloser(message) {
      if ("success"===message) {
        this.$message({
          type: "success",
          message:"数据修改成功"
        });
      }
      this.showEdit = false;
      this.getList();
    },
    //新增按钮
    handleAdd() {
      this.showAdd = true;
    },
    //定义main容器的高度 自适应不同尺寸的屏幕 显示滚动条
    getHeight() {
      return window.innerHeight - 215;
    },
    //请求数据的方法
    async getList() {
      let params = {
        name: this.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      let result = await this.$http.post("/api/user/list", params);
      console.log(result);
      this.tableData = result.data.list;
      this.total = result.data.total;
    },
    //查询姓名
    searchHandler() {
      this.getList();
    },
    //页码发生改变时触发 把我请求的页码数发给后端
    currentChange(size) {
      console.log(size);
      this.pageNum = size;
      this.getList();
    },
    handleDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let rs = await this.$http.post("/api/user/del", { id });
          if (rs.data.code === 1) {
            this.getList(); //删除成功以后刷新一下页面
            this.$message({
              type: "success",
              message: rs.data.message
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(obj) {
      this.showEdit = true;
      console.log(obj)
      this.editMessage = obj;
    }
  },
  created() {
    //请求后端数据
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  line-height: 60px;
  .textIput {
    width: 200px;
  }
  .btnButton {
    width: 180px;
  }
}
.el-pagination {
  text-align: right;
  padding: 10px 10px 10px 0px;
  background: #fff;
}
</style>