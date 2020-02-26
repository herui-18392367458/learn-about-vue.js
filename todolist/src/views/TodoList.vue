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
    components:{
        TodoForm,
        TodoList
    },
    created(){
        this.getList()
    },
    methods:{
        ...mapActions(["getList"])
    }
}
</script>