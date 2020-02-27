<template>
    <div>
        <input type="text" v-model="name">
        <button @click="submitMes">提交</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:""
        }
    },
    methods:{
        //输入框输入的内容添加到表格里
        submitMes(){
            //定义一个对象，符合list的数据结构
            var params={
                id:Math.ceil(Math.random()*1000),
                name:this.name,
                isedit:false
            };
            //提交给vuex的mutations，数据传过去
            this.$store.commit('PUSH_LIST',params);
            this.name=""
        }
    }
}
</script>