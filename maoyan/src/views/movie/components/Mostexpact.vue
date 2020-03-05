<template>
        <div class="most-item">
            <img :src="item.img|formatImg('85.115')">
            <h4>{{item.nm}}</h4>
            <p>{{item.comingTitle}}</p>
        </div>
</template>
<script>
export default {
    props:["item"]
}
</script>
<style lang="scss" scoped>
    .most-item{
        margin-left:7.5px;
        margin-right:7.5px;
        img{
            width: 85px;
            height: 115px;
        }
        h4{
            width: 80px;
            line-height: 20px;
            font-size: 13px;
            color: #222;
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        p{
            width: 80px;
            line-height: 15px;
            font-size: 12px;
            color: #999;
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>