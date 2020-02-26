<template>
    <table>
        <thead>
            <td>ID</td>
            <td>姓名</td>
            <td>性别</td>
            <td>年龄</td>
            <td>操作</td>
        </thead>
        <tbody>
            <TodoItem v-for="c in list" :item=c :key="c.id"></TodoItem>
        </tbody>
    </table>
</template>
<script>
import TodoItem from "./TodoItem"
import {mapState} from "vuex"
export default {
    components:{
        TodoItem
    },
    computed:{
        ...mapState(["list"])
    }
}
</script>
<style lang="scss">
 table{
     width: 400px;
     border-collapse: collapse;
     tr,td{
          height: 50px;
          border:1px solid red;
          text-align: center
     }
 }
</style>