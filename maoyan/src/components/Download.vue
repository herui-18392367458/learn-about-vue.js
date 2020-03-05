<template>
    <div class="down-container">
        <div class="left">
          <img src="http://s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png" alt="">
        </div>
        <div class="meddle">
           <h3>猫眼</h3>
           <p>在线选座，热门影讯，爱上看电影</p>
        </div>
        <div class="right">
           <div class="btn">立即打开</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import 'assets/style/mixin.scss';
.down-container{
    display: flex;
    height: 64px;
    align-items: center;
    @include border-bottom-1px(#d8d8d8);
    .left{
        margin-left: 15px;
        img{
          width: 44px;
        }
    }
    .meddle{
        margin-left: 5px;
        h3{
           font-size: 17px;
           color: #222;
           line-height: 23px;
           font-family: PingFangSC-Regular,Hiragino Sans GB,sans-serif;
           font-weight: 300;
        }
        p{
            font-size: 12px;
            color: #999;
            line-height: 23px;
        }
    }
    .right{
        margin-left: 54px;
        .btn{
            width: 68px;
            line-height: 25px;
            text-align: center;
            background: #ef4238;
            border-radius: 3px;
            font-size: 13px;
            color: #fff;
        }
    }
    
}
</style>