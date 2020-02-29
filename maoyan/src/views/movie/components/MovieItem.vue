<template>
    <div class="movie-container">
         <div class="left">
              <img src="https://p0.meituan.net/128.180/moviemachine/331c70099c5728d53694009426fb84ba165027.jpg">
         </div>
         <div class="middle">
             <h1>通往春天的列车</h1>
             <p>
                 <span class="num">6568</span>
                 <span>人想看</span>
             </p>
             <p>主演: 任素汐,李岷城,陈宇星,任素汐,李岷城,陈宇星,任素汐,李岷城,陈宇星</p>
             <p>2020-03-20上映</p>
         </div>
         <div class="right">
            <div class="btn">购买</div>
         </div>
    </div>
</template>
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
               line-height: 32px
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