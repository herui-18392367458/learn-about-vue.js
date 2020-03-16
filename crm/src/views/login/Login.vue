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
        <el-checkbox label></el-checkbox>&nbsp;&nbsp;记住我
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="handlSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      userules: {
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handlSubmit() {
      this.$refs.ruleForm.validate(vail => {
        console.log(vail);
        console.log(this.user)
        if(vail){
           this.$http.post(
        '/api/user/login',
        {username:this.user.username,password:this.user.password})
        }
        
      });
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