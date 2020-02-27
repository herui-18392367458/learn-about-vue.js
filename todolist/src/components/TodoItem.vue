<template>
    <tr>
        <td>{{item.id}}</td>
        <td>
            <span v-if="!item.isedit">
              {{item.name}}
            </span>
            <span>
               <input type="text" ref="name" :value="item.name" v-if="item.isedit">
            </span>
            
        </td>
        <!-- <td>{{item.sex}}</td>
        <td>{{item.age}}</td> -->
        <td>
            <span v-if="!item.isedit">
              <button @click="edit(item.id)">编辑</button>
              <button @click="del(item.id)">删除</button>
            </span>
            <span v-if="item.isedit">
                <button @click="submit(item.id)">提交</button>
            </span>
            
        </td>
    </tr>
</template>
<script>
export default {
    props:["item"],
    methods:{
        //提交删除的方法给mutations
        del(id){
            this.$store.commit('Del',id)
        },
        //提交编辑状态开的方法给mutations
        edit(id){
            this.$store.commit('UPDARE_NAME',{id,isedit:true})
        },
        //提交编辑后提交的方法给mutations
        submit(id){
            this.$store.commit('SUBMIT_NAME',{
                id,
                name:this.$refs.name.value,
                isedit:false
                })
        }
    }
}
</script>