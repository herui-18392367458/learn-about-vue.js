<template>
<div class="box">
    <div class="most-wrapper">
      <div class="most-container" ref="most">
        <Mostexpact v-for=" item in dataSet.coming" :key="item.id" :item="item"></Mostexpact>
      </div>
   </div>
</div>
</template>
<script>
import Mostexpact from "./Mostexpact"
import BScroll from '@better-scroll/core'
import {mostExpact} from "@/api/movie";
export default {
    data(){
        return{
            dataSet:{
                comming:[],
                paging:{}
            }
        }
    },
    components:{
        Mostexpact
    },
    methods:{
         initBscroll(){
            //注册滑动事件
            this.bscroll = new BScroll('.most-wrapper',{
               click:true,
               scrollX: true,
               pullUpLoad: true,
               probeType: 3,
            })
        },
    },
    async created(){
        let params={
            ci: 59,
            limit: 10,
            offset: 0,
            token: "Of_-eaqppfIwhURCtFQr4obVRAoAAAAAEAoAAIhpTE_fTYvcC3TFicqcPgLW8LzF6YfJbZLl_DvaacNLskEYYis9fWny8e3gEa9Ndw",
            optimus_uuid: "CAE48F805C7F11EAAC357560FD95B1DD759AFC3B9236417888627C1FE814CED2",
            optimus_risk_level: 71,
            optimus_code: 10
        }
        let result=await mostExpact(params);
        this.dataSet=result.data;
        console.log(result)
        // console.log(this.$refs)
        this.$refs.most.style.width=result.data.coming.length*109+'px'
        // console.log(this.dataSet)
        this.$nextTick(()=>{
            this.initBscroll()
        })
    }
}
</script>
<style lang="scss" scoped>
.most-wrapper{
    margin: 12px;
    overflow: hidden;
   .most-container{
      display: flex;
  }
  .most-container div:first-child{
      margin-left: 0;
  }
}
  
</style>