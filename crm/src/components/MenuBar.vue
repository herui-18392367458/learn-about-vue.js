<template>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      :default-openeds="['1','2']"
      >
      <el-submenu :index="item.meta.id" v-for="(item,index) in getNav(this.$router.options.routes)" :key='index'>
        <template slot="title">
          <i :class="item.meta.iconClass"></i>
          <span>{{item.meta.name}}</span>
        </template>
        <el-menu-item @click="handlerOpen(item1)" :index="item1.meta.id" v-for="item1 in getNav(item.children)" :key="item1.meta.id">{{item1.meta.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
</template>
<script>
export default {
    data(){
       return {
         
       }
    },
    methods:{
      getNav(list){
          return list.filter((item)=>{
            return item.meta&&item.meta.name
         })
      },
       handlerOpen(a){
          //  console.log(a)
           this.$router.push(a.path)
           console.log(this.$route)
       }
    },
    mounted(){
        console.log(this.$route)
    }
    
}
</script>
<style lang="scss" scoped>
.el-menu{
    text-align:left
}
</style>