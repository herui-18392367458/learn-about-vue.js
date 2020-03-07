<template>
<div class="box">
    <div class="most-wrapper">
      <div class="most-container" ref="most">
        <Mostexpact v-for=" item in dataSet.coming" :key="item.id" :item="item"></Mostexpact>
      </div>
   </div>
   <div class="main-container">
       <div v-for="(value,name) in main" :key="name">
            <h4>{{name}}</h4>
            <Main-container v-for="item in value " :key="item.id" :item="item"></Main-container>
       </div>
   </div>  
</div>
</template>
<script>
import Mostexpact from "./Mostexpact"
import MainContainer from "./MovieItem"
import BScroll from '@better-scroll/core'
import {mostExpact,movieList} from "@/api/movie"
import { Indicator } from 'mint-ui'
export default {
    components:{
        Mostexpact,
        MainContainer
    },
    data(){
        return{
            //用于节流的变量
            isScroll:true,
            //横向滚动的数据
            dataSet:{
                coming:[],
                paging:{
                    hasMore: true,
                    limit: 10,
                    offset: 0,
                    total: 10
                }
            },
            mainList:{
               coming:[]
            }
        }
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
            this.bscroll.on('scrollEnd',async(position)=>{
            if(this.isScroll&&this.bscroll.maxScrollX===position.x){
                this.isScroll=false
                await this.getMostExpactList()
                this.isScroll=true
            }
        })
        },
        //横向滚动的数据请求
        async getMostExpactList(){
        let params={
            limit: this.dataSet.paging.limit,
            offset: this.dataSet.paging.offset,
        //     token: "Of_-eaqppfIwhURCtFQr4obVRAoAAAAAEAoAAIhpTE_fTYvcC3TFicqcPgLW8LzF6YfJbZLl_DvaacNLskEYYis9fWny8e3gEa9Ndw",
        //     optimus_uuid: "CAE48F805C7F11EAAC357560FD95B1DD759AFC3B9236417888627C1FE814CED2",
        //     optimus_risk_level: 71,
        //     optimus_code: 10
        }
        Indicator.open();
        let result=await mostExpact(params);
        const arr=result.data.coming.slice(this.dataSet.paging.offset,this.dataSet.paging.offset+this.dataSet.paging.limit)
        this.dataSet.coming.push(...arr)
        Indicator.close();
        this.dataSet.paging.offset+=this.dataSet.paging.limit
        this.$refs.most.style.width=this.dataSet.coming.length*109+'px'
        this.$nextTick(()=>{
            this.initBscroll()
        })
        },
    //纵向滚动请求数据
        async getMainContainer(){
           let result=await movieList()
        //    console.log(result.data.coming)
           this.mainList.coming=result.data.coming
        }
    },
    //用计算属性实现对日期数据的筛选  依托于一个对象
    computed:{
        main(){
            let obj={};
            this.mainList.coming.forEach(item=>{
                if(!obj[item.comingTitle]){
                  obj[item.comingTitle]=[item]
                }else{
                  obj[item.comingTitle].push(item)
                }
            })
            // console.log(obj)
            return obj
        }
    },
    created(){
        //横向滚动的
        this.getMostExpactList()
        //纵向滚动
        this.getMainContainer()
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
.main-container{
    h4{
        margin-top:5px;
        margin-left: 15px;
        font-size: 14px;
        color: #333;
        font-family: PingFangSC-Regular,Hiragino Sans GB,sans-serif;
        font-weight: 300;
    }
}

</style>