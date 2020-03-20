<template>
  <el-dialog class="dialog-wrapper" title="新增" :visible.sync="dialogFormVisible">
    <el-form :model="userInfo">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input-number v-model="userInfo.age" :min="20" :max="50" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio v-model="userInfo.sex" label="0">男</el-radio>
        <el-radio v-model="userInfo.sex" label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="userInfo.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入地址" v-model="userInfo.adress"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: true,
      formLabelWidth: "70px",
      userInfo: {
        id: "",
        name: "",
        age: "20",
        sex: "0",
        date: "",
        address: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.dialog-wrapper{
    text-align: left;
    .el-form{
        margin-right: 20px;
    }
}
</style>