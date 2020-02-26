<template>
    <tr>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.sex}}</td>
        <td>{{item.age}}</td>
        <td>
            <button>编辑</button>
            <button @click="del(item.id)">删除</button>
        </td>
    </tr>
</template>
<script>
export default {
    props:["item"],
    methods:{
        del(id){
            this.$store.commit('Del',id)
        }
    }
}
</script>