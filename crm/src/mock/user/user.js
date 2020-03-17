import Mock from 'mockjs'
//配置一个延时响应 介于200-600ms以后给前端响应数据 为了模拟一个真实数据请求时候的客户端体验效果
//搭配页面上加一个转圈的效果 给客户加强体验感
Mock.setup({
    timeout: '200-600'
})
const user={
    username:"admin",
    password:"123456"
}
//模拟登陆接口
Mock.mock('/api/user/login','post',(options)=>{
    console.log(options)
    let {username,password}=JSON.parse(options.body)
    //注意这里的数据类型，三等判断必须数据类型和值都要相等
    // console.log(username,password)
    // console.log(user.username,user.password)
    if(username===user.username&&password===user.password){
      return Mock.mock({
         code:1,
         message:"登陆成功"  
      })
    }else{
        return Mock.mock({
            code:0,
            message:"用户名或密码错误"  
         })
    }
})
//模拟。。。接口