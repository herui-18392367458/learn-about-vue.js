<template>
  <div class="login-wrapper">
    <el-form :model="user" class="login-form" :rules="userules" ref="ruleForm">
      <h1>系统登陆</h1>
      <el-form-item prop="username">
        <el-input v-model="user.username" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-checkbox label v-model="user.checked"></el-checkbox>&nbsp;&nbsp;记住我
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" :loading="isLoading" @click="handlSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      user: {
        username: "",
        password: "",
        checked: false
      },
      userules: {
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handlSubmit() {
      this.isLoading = true; //登陆按钮开启转圈效果
      this.$refs.ruleForm.validate(async vail => {
        console.log(vail);
        console.log(this.user);
        if (vail) {
          let result = await this.$http.post("/api/user/login", {
            username: this.user.username,
            password: this.user.password
          });
          console.log(result);

          this.isLoading = false; //登陆按钮关闭转圈效果

          if (result.data.code === 0) {
            this.$message({
              showClose: true,
              message: "用户名或者密码错误",
              type: "error"
            });
          } else if (result.data.code === 1) {
            //如果客户选择了记住密码  将用户名/密码/记住密码存在本地localStorage
            if (this.user.checked) {
              localStorage.setItem("checked", this.user.checked);
              localStorage.setItem("username", this.user.username);
              localStorage.setItem("password", this.user.password);
            } else {
              //如果没有选,删除本地的数据
              localStorage.removeItem("checked");
              localStorage.removeItem("username");
              localStorage.removeItem("password");
            }
            sessionStorage.setItem("username", this.user.username);
            this.$router.push("/home");
          }
        }
      });
    }
  },
  mounted() {
    let checked = localStorage.getItem("checked");
    if (checked) {
      this.user.checked=true;
      this.user.username = localStorage.getItem("username");
      this.user.password = localStorage.getItem("password");
    }
  }
};
</script>
<style lang="scss" scoped>
.login-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 500px;
    height: 400px;
    box-sizing: border-box;
    padding: 30px;
    box-shadow: 0px 0px 15px #ccc;
    border-radius: 6px;
    h1 {
      width: 100%;
      text-align: center;
      font-size: 30px;
      margin-bottom: 30px;
    }
    button {
      width: 100%;
    }
  }
}
</style>