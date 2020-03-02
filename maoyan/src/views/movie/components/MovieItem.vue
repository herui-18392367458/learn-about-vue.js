<template>
    <div class="movie-container">
         <div class="left">
             <!-- 使用过滤器，将src地址中的问题字段替换 -->
              <img :src="item.img | formateImg">
         </div>
         <div class="middle">
             <h1>{{item.nm}}</h1>
             <p>
                 <span class="num">{{item.wish}}</span>
                 <span>人想看</span>
             </p>
             <p>主演:{{item.star}}</p>
             <p>{{item.rt}}上映</p>
         </div>
         <div class="right">
            <div class="btn" >购买</div>
         </div>
    </div>
</template>
<script>
export default {
    props:["item"],
    filters:{
        formateImg(url){
            return url.replace(/w.h/,"128.180")
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import 'assets/style/mixin.scss';
    .movie-container{
        display: flex;
        height: 114px;
        padding: 12px 15px;
        box-sizing: border-box;
        @include border-bottom-1px(#d8d8d8);
        &::after{
            left: 90px;
            right: 15px
        }
        .left{
            flex:53;
            img{
                width: 64px;
                height: 90px
            }
        }
        .middle{
            width: 0;
            flex: 148;
            h1{
               font-size: 17px;
               color: #333;
               font-weight: 500;
               line-height: 32px;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
            }
            p{
               font-size: 13px;
               color: #666;
               line-height: 20px;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
               .num{
                    color: #faaf00;
                    font-size: 15px;
                    font-weight: 600;
               }
            }
        }
        .right{
            flex: 47;
            display: flex;
            justify-content: center;
            align-items: center;
            .btn{
                width:47px;
                line-height:27px;
                background: #faaf00;
                text-align: center;
                border-radius: 4px;;
                color:#fff
            }
        }
    }

</style>