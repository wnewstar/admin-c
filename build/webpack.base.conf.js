var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        static: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: config.dev.assetsPublicPath
    },
    module: {
        rules: [{
            test: require.resolve('jquery'),
            use: [
                { loader: 'expose-loader', options: '$' },
                { loader: 'expose-loader', options: 'jQuery' }
            ]
        }, {
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src'), resolve('test')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), resolve('node_modules/vue-snotify')]
        }, {
            test: /\.css$/,
            loader: 'vue-style-loader',
            include: [resolve('src'), resolve('test')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('font/[name].[hash:7].[ext]')
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.js',
            'component': '@/component',
            'admin-lte.js': 'admin-lte/dist/js/adminlte.js',
            'bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
            'ionicons.css': 'ionicons/dist/css/ionicons.min.css',
            'admin-lte.css': 'admin-lte/dist/css/AdminLTE.min.css',
            'bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
            'vue-snotify.css': 'vue-snotify/styles/material.css',
            'font-awesome.css': 'font-awesome/css/font-awesome.min.css',
            'admin-lte-skin.css': 'admin-lte/dist/css/skins/_all-skins.css',
            'jquery.slimscroll.js': '@/plugin/slimscroll/jquery.slimscroll.js'
        }
    }
}
