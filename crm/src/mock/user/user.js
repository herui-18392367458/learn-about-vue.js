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
    // console.log(options)
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
//模拟退出接口
Mock.mock('/api/user/loyout','get',()=>{
    //后端做删除session和cookie的操作
    return Mock.mock({
        code:1,
        message:"退出登陆成功"
    })
})
//模拟user中list接口
var Users=[];
function initList(){
    //生成固定的66条数据  
    for(var i=0;i<66;i++){
        let params=Mock.mock({
            id:"@increment()",
            name:"@cname()",
            age:"@natural(20,50)",
            sex:"@natural(0,1)",
            date:"@date()",
            address:"@county(true)"
        })
        Users.push(params)
    }
    return Users 
}
initList()
Mock.mock('/api/user/list','post',(options)=>{
    console.log(options)
    //解构出来前端传过来的查询字段，页数，条数
    let {name,pageNum,pageSize}=JSON.parse(options.body)
    //查询符合前端根据字段name查询的结果放到一个数组 name传了就查，没查就是空，返回的仍然是全部数据
    let UserList=Users.filter((item)=>{
        return item.name.indexOf(name)>-1;
    })
    //分页 定义开始索引，结束索引，放到一个新的数组
    let startIndex=(pageNum-1)*pageSize,
        endIndex=startIndex+pageSize
    let backList=UserList.slice(startIndex,endIndex)
    return{
        code:1,
        //返回前端要查的结果
        list:backList,
        total:UserList.length
    }
})
Mock.mock('/api/user/del','post',(options)=>{
    console.log(options)
    let {id}=JSON.parse(options.body)
    Users.forEach((item,index)=>{
        if(item.id===id){
            Users.splice(index,1)
        }
    })
    return {
        code:1,
        message:"删除成功"
    }   
})
