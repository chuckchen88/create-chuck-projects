// node 内置模块
const path = require('path')
//var webpack = require('webpack')
// 用于打包html
//const HtmlWebpackPlugin = require('html-webpack-plugin')  
// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
const { VueLoaderPlugin } = require('vue-loader')

var entry = "./src/main.js";
var filename = "build.js";
var sourceMap = 'eval-source-map' // 保证运行时报错的行数与源代码的行数保持一致
var hints = false

if (process.env.NODE_ENV !== "development") {
  entry = "./src/plugins/index.js";  // 打包入口
  filename = "main.min.js";
  sourceMap = 'nosources-source-map'  // 只想定位报错的具体行数，且不想暴露源码
  hints = false
}
// 导出webpack配置信息
module.exports = {
  mode: process.env.NODE_ENV, // 环境模式
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包出口
    publicPath: '/dist/',
    filename,
    libraryTarget: "umd",
    umdNamedDefine: true, // 给 AMD 模块命名，否则匿名
    clean: true, //在每次构建前清理 /dist 文件夹
  },
  devServer: {
    static: path.resolve(__dirname, './'),
    port: 8080,
    open:true
  },
//   externals: {
//     vue: "vue"  // 忽略vue模块
//   },
  module: {
    rules: [
        //vue
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      // less
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader'] //还需安装less
      },
      /**
       * 将es6转es5
       */
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // 图片文件处理
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          esModule: false
        }
      }
    ]
  },
  // 插件
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './index.html'), // 我们要使用的 html 模板地址
    //   filename: 'index.html', // 打包后输出的文件名
    //   title: '手搭 Vue 开发环境' // index.html 模板内
    // }),
    /**
     * VueLoaderPlugin 的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
     */
    new VueLoaderPlugin()
  ],
  // 解析
  resolve: {
    // 创建 import 或 require 的别名，来确保模块引入变得更简单。
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    //尝试按顺序解析这些后缀名
    extensions: ['*', '.js', '.vue', '.json']
  },
  // 配置如何展示性能提示
  performance: {
    hints  // 判断是否有体积比较大的 bundle 
  },
  /**
   * Source Map 的最佳实践：
    ① 开发环境下： 建议把 devtool 的值设置为 eval-source-map  好处：可以精准定位到具体的错误行。
    ② 生产环境下： 建议关闭 Source Map 或将 devtool 的值设置为 nosources-source-map 好处：防止源码泄露，提高网站的安全性。
   */
  devtool: sourceMap  // sourcemap用于储存着位置信息，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
}