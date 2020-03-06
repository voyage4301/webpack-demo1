const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') // html模板插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包时清除dist目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离js中的css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // css压缩

const webpackPlugins = {
    entry: {
        main: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        publicPath: './',
        path: path.resolve(__dirname, 'dist'),
        filename: './static/js/[name].[hash:10].js',
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
                    { loader: MiniCssExtractPlugin.loader, options: { publicPath: './static/css' } },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/images',
                            publicPath: '../images'
                            // esModule: false,
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'url-loader',
                options: {
                    // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                    limit: 1024 * 1, //10000
                    // 路径和生产环境下的不同，要与修改后的publickPath相结合
                    // name: 'images/[name].[ext]?[hash:7]',
                    name: '[name].[ext]',
                    publicPath: '../images', //会在打包后图片路径拼上该设置
                    outputPath: '/static/images'//输出的图片会生成并放在当前设置的文件夹下
                }
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname)
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            dry: false,
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'dist'),
            ],
        }),

        new HtmlWebPackPlugin({
            title: 'App',
            minify: { // 压缩 html
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 删除空白符和换行
                minifyCSS: true, // 压缩内敛 css
            },
            template: path.resolve(__dirname, 'public', 'index.html'), //模板
            filename: 'index.html',
            inject: true, // true || body script位于body底部
            favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
            chunks: ['main'] // 多入口 对应 entry里的
        }),
        new MiniCssExtractPlugin({ filename: './static/css/[name].[hash:10].css' }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            // cssProcessorOptions: cssnanoOptions,
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                    normalizeUnicode: false
                }]
            },
            canPrint: true
        })
    ]
}

module.exports = webpackPlugins