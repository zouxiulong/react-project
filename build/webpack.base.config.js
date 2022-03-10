require('./process.env.js')
const { merge } = require("webpack-merge")
const path = require("path"),
    SRC_PATH = path.resolve(__dirname, "../src"),
    isProd = process.env.NODE_ENV == "production",
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    // 分离出css文件
    MIniCssExtractPlugin = require('mini-css-extract-plugin'),

    fs = require("fs"),
    os = require('os');



/** @type {import('webpack').Configuration} */

const pages = fs.readdirSync(path.resolve(SRC_PATH, "./js"), "utf-8")
let htmlData = [],
    entryObj = {};

pages.filter(item => {
    return path.extname(item) === ".tsx";
}).map(item => {
    const _pageName = path.basename(item, path.extname(item)) 
    htmlData.push(
        new HtmlWebpackPlugin({
            title: _pageName,
            root: 'app',
            filename: `./${_pageName}.html`, // // html模板的生成路径
            template: path.resolve(__dirname, "../template/template.js"),
            inject: true, // true：默认值，script标签位于html文件的 body 底部
            hash: true, // 在打包的资源插入html会加上hash
            // html 文件进行压缩
            minify: {
                removeComments: true, //去注释
                collapseWhitespace: true, //压缩空格
                removeAttributeQuotes: true, //去除属性引用
            },
            common: [
                "https://cdn.bootcss.com/react/17.0.2/umd/react.development.js",
                "https://cdn.bootcss.com/react-dom/17.0.2/umd/react-dom.development.js"
            ]
        }),
    )
    entryObj[_pageName] = path.join(`${SRC_PATH}/js`, item)
})


const baseConfig = {
    entry: entryObj,

    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name]_[chunkhash:8].js",
    },

    // 不打包cdn引入的库
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    resolve: {
        alias: {
            src: SRC_PATH,
        },
        extensions: [".js", ".jsx", ".tsx", ".tsx", "json"],
    },

    module: {
        rules: [
            {
                test: /\.(js|ts)x$/,
                exclude: /node_modules/,
                use: [
                    "cache-loader",
                    "babel-loader",
                    "ts-loader"
                ],
            },
           
            {
                test: /\.(css|sass)$/,
                use: [
                    isProd ? {
                        loader: MIniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    } : "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },

            {
				test: /\.(png|jpg|gif|webp)$/,
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'images/[name].[ext]'
				}
			},

			{
				test: /\.(eot|woff|woff2|ttf|svg)/,
				loader: 'url-loader',
				options: {
					// limit: 100,
					name: 'fonts/[name].[ext]'
				}
			},
        ],
    },

    plugins: htmlData
}

module.exports = merge(
    baseConfig,
    isProd
        ? require("./webpack.prod.config.js")
        : require("./webpack.dev.config.js")
)
