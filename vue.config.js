const { resolve } = require('path')
module.exports = {
    css: {
        loaderOptions: {
            less: {
                // 属性值包裹在lessOptions内
                lessOptions: {
                    javascriptEnabled: true,
                    globalVars: {
                        primary: '#fff'
                    }
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                'public': resolve('public')
            }
        }
    },
}