const path = require('path');
const webpack = require('webpack');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const base = require('./webpack.base');
const { config: webpackBaseConfig, getFiles } = base;

//  接口服务器地址
const API_HOST = 'https://test.cmyynet.com';

// 开发环境的webp打包工具配置
const PORT = 4000;

// 开发环境下，将静态资源的根路径重置为/
webpackBaseConfig.output.publicPath = '/';

// 开发环境引入开发环境的vue
webpackBaseConfig.resolve.alias.vue = 'vue/dist/vue.js';
webpackBaseConfig.devServer = {
    host: '0.0.0.0',
    port: PORT,
    compress: true,
    public: '',
    inline: true,
    contentBase: path.resolve(__dirname, './src'),
    watchOptions: {
        watchContentBase: true,
        redirect: false,
        watch: true,
        poll: 1000,
        aggregateTimeout: 300 // 默认值
    },
    historyApiFallback: {
        rewrites: []
    }
};

// 动态重写路由表，仅开发时使用
(function () {
    const pages = Object.keys(getFiles('./src/pages/**/*.html'), 'src/pages/');
    pages.forEach((el) => {
        const path = el.split('/');
        const route = path.splice(-2).join('/');

        webpackBaseConfig.devServer.historyApiFallback.rewrites.push({
            // 保证一定是以route结尾或者.html和?a=1形势的参数结尾
            from: new RegExp(`^/${route}(?![a-zA-Z0-9_-])`),
            to: `/pages/${route}.html`
        });
    });
})();

// webpackBaseConfig.devServer.proxy = {
//   '/zlgxwl': {
//     target: API_HOST,
//     changeOrign: true
//   }
// };

// webpackBaseConfig.devServer.proxy = [{
//     context: ['/Interface'],
//     target: API_HOST,
//     secure: false
// }];
webpackBaseConfig.devServer.proxy = {
    '/Interface':{
        target: API_HOST,
        secure: false,
        changeOrigin: true,
    }
};


webpackBaseConfig.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
);
webpackBaseConfig.module.rules.push(
    {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]&outputPath=static/fonts/',
        exclude: /(static\/images|pages)/
    },
    {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader?limit=8196&name=static/images/[name].[ext]?[hash]'
    }
);
module.exports = webpackBaseConfig;
