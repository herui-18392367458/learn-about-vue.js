<template>
  <div class="home">
    <el-container class="home-container">
      <el-header>
        <el-row>
          <el-col :span="4" :offset="20">
            <el-dropdown @command="handlerCommand">
              <span class="el-dropdown-link">
                欢迎，{{user.username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" command="quit">退出</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus" command="set">用户设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <MenuBar></MenuBar>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.meta.id">
              <a :href="item.path">{{item.meta.name}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuBar from "../components/MenuBar";
export default {
  name: "Home",
  data() {
    return {
      user: {
        username: ""
      }
    };
  },
  components: {
    MenuBar
  },
  methods: {
    async handlerCommand(command) {
      // console.log(command);
      if (command === "quit") {
        let result = await this.$http.get("/api/user/loyout");
        if (result.data.code === 1) {
          this.$message({
            message: result.data.message,
            type: "success"
          });
          setTimeout(() => {
            sessionStorage.removeItem("username");
            this.$router.push("/login");
          }, 1000);
        }
      }
    }
  },
  mounted() {
    this.user.username = sessionStorage.getItem("username");
  }
};
</script>
<style lang="scss" scoped>
.home,
.home-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}

// .el-container {
//   margin-bottom: 40px;
// }

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
