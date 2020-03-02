<template>
    <div class="wrapper">
        <div class="content">
            <MovieItem v-for="item in dataSet.coming" :key="item.id" :item="item"></MovieItem>
        </div>
    </div>
</template>
<script>
import MovieItem from './MovieItem'
import {movieList,moreList} from '@/api/movie'
//引入better-scroll
import BScroll from '@better-scroll/core'
//引入pullup 页面滑到底会触发的插件
import Pullup from '@better-scroll/pull-up'
//注册pillup
BScroll.use(Pullup)
export default {
    components:{
        MovieItem
    },
    data(){
        return {
            startIndex:12,
            pageSize:10,
            dataSet:{
                coming:[],
                movieIds:[]
            }
        }
    },
    methods:{
         initBscroll(){
            //注册滑动事件
            this.bscroll = new BScroll('.wrapper',{
               click:true,
               scrollY: true,
               pullUpLoad: true,
               probeType: 3,
            })
            //当页面滑到底触发
            this.bscroll.on('pullingUp',()=>{
                this.addList()
            })
        },
        //请求第二页数据
        // ci:59
        // token:"Of_-eaqppfIwhURCtFQr4obVRAoAAAAAEAoAAIhpTE_fTYvcC3TFicqcPgLW8LzF6YfJbZLl_DvaacNLskEYYis9fWny8e3gEa9Ndw"
        // limit:10
        // optimus_uuid:"CAE48F805C7F11EAAC357560FD95B1DD759AFC3B9236417888627C1FE814CED2"
        // optimus_risk_level:71
        // optimus_code:10
        async addList(){
            //加一个条件判断，当数据都加载完成，返回，不再push空数组
            if(this.dataSet.coming.length===this.dataSet.movieIds.length){
                this.bscroll.finishPullUp()
                return
            }
            let movieIds=this.dataSet.movieIds.slice(this.startIndex,this.startIndex+this.pageSize)
            var params={
                // ci:59,
                token:"Of_-eaqppfIwhURCtFQr4obVRAoAAAAAEAoAAIhpTE_fTYvcC3TFicqcPgLW8LzF6YfJbZLl_DvaacNLskEYYis9fWny8e3gEa9Ndw",
                // optimus_uuid:"CAE48F805C7F11EAAC357560FD95B1DD759AFC3B9236417888627C1FE814CED2",
                // optimus_risk_level:71,
                // optimus_code:10,
                movieIds:movieIds.join(',')
            }
            let result=await moreList(params)
            this.dataSet.coming.push(...result.data.coming)
            console.log(result.data.coming)
            this.$nextTick(()=>{
                this.startIndex+=this.pageSize
                //告诉浏览器滚动结束
                this.bscroll.finishPullUp()
                //滚动条回归初始位置
                this.bscroll.refresh()
            })
           
        }
},
    async created(){
        //请求电影列表的数据
        let result=await movieList();
        //赋值给data中的dataset
        this.dataSet=result.data;
        this.$nextTick(()=>{
            //dom重新渲染的时候，确认数据已经回来，给dom加better-scroll
            this.initBscroll()
        })
    },
}
</script>