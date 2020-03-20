<template>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      :default-openeds="['1','2']"
      >
      <el-submenu :index="item.meta.id" v-for="(item,index) in this.$router.options.routes" v-if="item.meta&&item.meta.name" :key='index'>
        <template slot="title">
          <i :class="item.meta.iconClass"></i>
          <span>{{item.meta.name}}</span>
        </template>
        <el-menu-item @click="handlerOpen(item1)" :index="item1.meta.id" v-for="item1 in item.children" :key="item1.meta.id">{{item1.meta.name}}</el-menu-item>
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