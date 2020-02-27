<template>
    <div>
      <TodoForm></TodoForm>
      <TodoList></TodoList>
    </div>
</template>
<script>
import TodoForm from "../components/TodoForm."
import TodoList from "../components/TodoList"
import {mapActions} from "vuex"
export default {
    created(){
        // this.getList()
    },
    components:{
        TodoForm,
        TodoList
    },
    methods:{
        ...mapActions(["getList"])
    }
       
}
</script>