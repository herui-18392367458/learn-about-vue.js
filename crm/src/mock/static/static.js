// { value: 335, name: "直接访问" },
//               { value: 310, name: "邮件营销" },
//               { value: 234, name: "联盟广告" },
//               { value: 135, name: "视频广告" },
//               { value: 1548, name: "搜索引擎" }
import Mock from 'mockjs';
Mock.setup({
	timeout: '200-2000'
});
Mock.mock('/api/static/chartPie','get',()=>{
    return Mock.mock({
        code:1,
        "list|5":[{
            value:"@natural(1,2000)",
            name:"@cname(4,6)"
        }]
    })
})