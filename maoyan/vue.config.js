const postcsspxtovw = require('postcss-px-to-viewport');
const path=require('path')
module.exports = {
    //配置多页面 根据路径不同渲染出不同的页面
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'Index Page',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        detail: {
            // page 的入口
            entry: 'src/detail.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'detail.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '详情',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'detail']
          }

    },
    //跨域的配置
    devServer:{
      proxy:{
          "/api":{
              target:"http://m.maoyan.com",
              changeOrigin:true,
              pathRewrite:{
                  "^/api":""
              }
          }
      }
    },
    //配置适配不同尺寸的屏幕
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    new postcsspxtovw({
                        unitToConvert: 'px',  
                        viewportWidth: 375,    
                        unitPrecision: 5,      
                        propList: ['*'],       
                        viewportUnit: 'vw',    
                        fontViewportUnit: 'vw',
                        selectorBlackList: [],
                        minPixelValue: 1,      
                        mediaQuery: false,
                        replace: true,
                        exclude: [/node_modules/]
                    })
                ]
            }
        }
    },
    //配置路径的别名
    chainWebpack: config => {
        return config.resolve.alias
        .set("assets",path.resolve(__dirname, './src/assets/'))
    }
};