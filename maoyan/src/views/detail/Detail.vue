<template>
    <div>
       <Header>
           <template #back>
              <i class="back" @click="back">&lt;</i>
           </template>
       </Header>
       <div>
           {{$route.params}}
       </div>
      
    </div>
</template>
<script>
import Header from "../../components/Header"
export default {
    components:{
        Header
    },
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
 .back{
     float: left;
     margin-left: 20px;
     font-size: 20px;
 }
</style>