<template>
    <div>
       <Header>
           <template #back>
              <i class="icon-back" @click="back"></i>
              <span class="title">{{$route.params.nm}}</span>
           </template>
       </Header> 
       <div class="banner">
           <div class="left">
               <img :src="$route.params.img | formatImg('148.208')" alt=""></div>  
           <div class="meddle">
               <h1>{{$route.params.nm}}</h1>
               <p>More Than Blue</p>
               <p>
                   <span class="mark">8.0</span>
                   <span >(61.2万人评)</span>
               </p>
               <p>剧情,爱情</p>
               <p>中国台湾/105分钟</p>
               <p>{{$route.params.rt}}大陆上映</p>
           </div>
           <div class="right">
               <img src="//p0.meituan.net/scarlett/c3645757d488524c4af43f8278ceb929372.png" alt="">
           </div>     
       </div>
       <div class="showDays">
            <ul :style="{'margin-left':toleft+'px'}">
                <li :class="current===index? 'active' : ''" @click="handler(index,$event)" v-for="(d,index) in showDays" :key="index">{{d.date}}</li>
            </ul>
       </div>
    </div>
</template>
<script>
import Header from "../../components/Header"
export default {
    data(){
        return{
            toleft:0,
            current:0,
            showDays:[
                {date: "2020-04-01", isPredate: 0},
                {date: "2020-04-02", isPredate: 1},
                {date: "2020-04-03", isPredate: 2},
                {date: "2020-04-04", isPredate: 3},
                {date: "2020-04-05", isPredate: 4},
                {date: "2020-04-06", isPredate: 5},
                {date: "2020-04-07", isPredate: 6},
                {date: "2020-04-08", isPredate: 7},
                {date: "2020-04-09", isPredate: 8},
                {date: "2020-04-010", isPredate: 9},
            ]
        }
    },
    components:{
        Header
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        handler(index,event){
            this.current=index;
            let x=event.clientX //鼠标位置距离当前body左边的距离
            console.log(x);
            if(x<120&&index>0){
               this.toleft+=130
            }
            else if(x>240&&index<this.showDays.length-1){
               this.toleft-=130
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "assets/style/mixin.scss";
.icon-back {
    display: inline-block;
    width: 22.5px;
    height: 22.5px;
    vertical-align: middle;
    position: absolute;
    left: 15px;
    top: 15px;
}
.icon-back:before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.banner{
    height: 188px;
    background: rgba($color: #000000, $alpha: 1.0);
    padding: 19px 20px 19px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .left{
        width: 110px; 
        img{
            width: 100%;
        }
    }
    .meddle{
        padding-left: 12.5px;
        width: 246px;
        height: 100%;
        color: #fff;
        h1{
            font-size: 20px;
            font-weight: 400;
            margin-top: 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        p{
            margin-top: 10px;
            font-size: 12px;
            color: #fff;
            opacity: .8;
            .mark{
                font-size: 18px;
                font-weight: 700;
                color: #fc0;
                margin-right: 5px;
            }
        }
    }
    .right{
        img{
            width: 10px;
            height: 14px;
        }
    } 
}
.showDays{
    width: 100%;
    height: 45px;
    @include border-bottom-1px(#cccc);
    ul{
        display: flex;
        overflow: scroll;
        transition: all .5s;
        li{
            flex-shrink: 0; //子元素超出父元素，不收缩子元素的宽度
            width: 115px;
            line-height: 45px;
            text-align: center;
            margin-left: 5px;
            font-size: 14px;
        }
        li.active{
            position: relative; 
            color: #ef4238;
        }
        li.active::after{
             position: absolute;  
             content: "";
             height: 2px;
             background: #ef4238;
             left: 5px;     //可以调整长度
             right: 5px;  //可以调整长度
             bottom:0   //可自由调整位置
        }
    }
}


</style>