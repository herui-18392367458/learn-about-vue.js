<template>
  <div id="app">
    <button @click="getProduct">获取产品</button>
    <button @click="getProductList">获取产品列表</button>
    <button @click="getProductById">通过id查询产品</button>
    <button @click="addProduct">增加产品</button>
  </div>
</template>

<script>
export default {
     methods:{
       async getProduct(){
         let result= await this.$http.get('/api/getProduct')
         console.log(result)
       },
       async getProductList(){
         let result= await this.$http.get('/api/getProductList')
         console.log(result)
       },
       async getProductById(){
         let result= await this.$http.get('/api/getProductById/6')
         console.log(result)
       },
       async addProduct(){
         let result= await this.$http.post('/api/addProduct',{
           name:"apple",
           price:888
         })
         console.log(result)
       }
     }
}
</script>
