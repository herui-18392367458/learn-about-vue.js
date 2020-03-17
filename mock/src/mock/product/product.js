import Mock from 'mockjs';
//返回单条数据
Mock.mock('/api/getProduct', 'get', {
	id: '@natural(10,20)', //随机生成10-20之间的自然数
	name: '@word()', //随机生成一个单词
	price: '@float(10,100)', //随机生成一个浮点数
	img: "@image('300x250','#ff6700','#000','mockjs')" //生成一张图片，尺寸，背景色，前景色，文本
});
//返回多个数据，以数组的形式
Mock.mock('/api/getProductList', 'get', () => {
	return Mock.mock({
		code: 1,
		'data|3-6': [
			//规则随机生成3-6个
			{
				id: '@natural(10,20)', //随机生成10-20之间的自然数
				name: '@word()', //随机生成一个单词
				price: '@float(10,100)', //随机生成一个浮点数
				img: "@image('300x250','#ff6700','#000','mockjs')", //生成一张图片，尺寸，背景色，前景色，文本
				adress: '@county(true)' //随机生成一个省市县区
			}
		]
	});
});
Mock.mock(/\/api\/getProductById\//, 'get', (options) => {
	console.log(options);
	//用正则匹配接收到的地址里的参数 然后拿出来
	let result = /\/api\/getProductById\/(\d+)/.exec(options.url);
	console.log(result);
	//返回给前端
	return Mock.mock({
		id: result[1],
		uid: '@guid()', //返回一串唯一的标识符
		name: '@word()'
	});
});
Mock.mock('/api/addProduct', 'post',(options)=>{
      console.log(options)
      return Mock.mock({
          id:1,
          message:"产品添加成功"
      })
});
