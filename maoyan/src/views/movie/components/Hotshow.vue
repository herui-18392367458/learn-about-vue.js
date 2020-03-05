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
//引入mint-ui
import { Indicator } from 'mint-ui';
//引入样式
import 'mint-ui/lib/style.css'
//注册pillup
BScroll.use(Pullup)
export default {
    components:{
        MovieItem
    },
    data(){
        return {
            startIndex:10,
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
            //页面滑动时监听scroll事件的y值，当小于-50时候，隐藏立即打开
            this.bscroll.on('scroll',(opation)=>{
                if(opation.y<-50){
                    this.$store.commit('UPDATE_DOWN_LOAD',false)
                }else{
                    this.$store.commit('UPDATE_DOWN_LOAD',true)
                }
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
            if(this.dataSet.coming.length===60){
                this.bscroll.finishPullUp()
                return
            }
            let movieIds=this.dataSet.movieIds.slice(this.startIndex,this.startIndex+this.pageSize)
            console.log(movieIds)
            var params={
                movieIds:movieIds.join(',')
            }
            Indicator.open();
            let result=await moreList(params)
            result.data.coming.forEach((item,index)=> {
                movieIds.forEach((ele,index)=>{
                    if(ele===item.id){
                       this.dataSet.coming.push(item)
                    }
                })
            });
            console.log(this.dataSet.coming)
            Indicator.close();
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
        // 请求电影列表的数据
        // let params={
        //     ci:59,
        //     token:"Of_-eaqppfIwhURCtFQr4obVRAoAAAAAEAoAAIhpTE_fTYvcC3TFicqcPgLW8LzF6YfJbZLl_DvaacNLskEYYis9fWny8e3gEa9Ndw",
        //     limit:10,
        //     optimus_uuid:"CAE48F805C7F11EAAC357560FD95B1DD759AFC3B9236417888627C1FE814CED2",
        //     optimus_risk_level:71,
        //     optimus_code:10
        // }
        // 显示加载数据
        Indicator.open();
        let result=await movieList();
        console.log(result)
        //赋值给data中的dataset
        this.dataSet=result.data;
        //关闭加载数据
        Indicator.close();
        this.$nextTick(()=>{
            //dom重新渲染的时候，确认数据已经回来，给dom加better-scroll
            this.initBscroll()
        })
    },
}
</script>