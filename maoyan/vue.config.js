const postcsspxtovw = require('postcss-px-to-viewport');
const path=require('path')
module.exports = {
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
    chainWebpack: config => {
        return config.resolve.alias
        .set("assets",path.resolve(__dirname, './src/assets/'))
    }
};