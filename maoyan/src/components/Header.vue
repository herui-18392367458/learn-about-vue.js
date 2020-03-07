<template>
    <div>
        <div class="header">
            <slot name="back">
            </slot>
            <span>猫眼电影</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
 .header{
        line-height: 50.5px;
        background:#e54847;
        color:#fff;
        text-align: center;
        font-size: 18px;
        font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
        font-weight: 300;
    }
</style>