const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') // html模板插件

const webpackPlugins = {
    entry: {
        main: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            esModule: false,
                            limit: 1024
                        },
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname)
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: '首页',
            /*  minify: { // 压缩 html
                 removeComments: true, // 移除注释
                 collapseWhitespace: true, // 删除空白符和换行
                 minifyCSS: true, // 压缩内敛 css
             }, */
            template: path.resolve(__dirname, 'public', 'index.html'), //模板
            filename: 'index.html',
            inject: true, // true || body script位于body底部
            favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
            chunks: ['main'] // 多入口 对应 entry里的
        }),
    ],
    devServer: {
        contentBase: [path.resolve(__dirname, 'dist')], //可以多个
        compress: true,
        port: 9000,
        // open: true,
        hot: true,
        clientLogLevel: "none",
        historyApiFallback: true, //当请求404时 重定向到 index.html
        /* historyApiFallback: { //可自定义
            rewrites: [
                { from: /^\/$/, to: '/views/landing.html' },
                { from: /^\/subpage/, to: '/views/subpage.html' },
                { from: /./, to: '/views/404.html' }
            ]
        }, */
        // https: true, // 开启https协议(自带的)
        /* https: { // 使用自己的https证书
            key: fs.readFileSync("/path/to/server.key"),
            cert: fs.readFileSync("/path/to/server.crt"),
            ca: fs.readFileSync("/path/to/ca.pem"),
        }, */
        lazy: false, // 为TRUE不会监视代码变化
        // noInfo: true, // 设置为True 终端不会展示打包和变化的信息
        proxy: {
            "/article": {
                target: "https://backend.guantaott.cn",
                secure: false, // 忽略https
                changeOrigin: true // target是域名要设置
            }
        }
    }
}

module.exports = webpackPlugins