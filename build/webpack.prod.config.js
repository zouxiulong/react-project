/** @type {import('webpack').Configuration} */

const BundleAnalyzerPlugin =
        require("webpack-bundle-analyzer").BundleAnalyzerPlugin,
    // 压缩js
    TerserPlugin = require("terser-webpack-plugin"),
    // 压缩css
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const plugins = []

// 如果参数有打包分析的配置 启动打包分析
if (process.env.REPORT) {
    console.log(
        "\033[32m 打包分析:\033[0m",
        "\033[34m http://127.0.0.1:" + process.env.REPORT + " \033[0m"
    )
    plugins.push(
        new BundleAnalyzerPlugin({
            openAnalyzer: true,
            analyzerPort: process.env.REPORT,
        })
    )
}
module.exports = {
    output: {
        clean: true,
    },
    plugins,

    // 打包优化项
    optimization: {
        usedExports: true, //只导出被使用的模块

        minimize: true, // 启动压缩,

        minimizer: [
            new TerserPlugin({
                extractComments: false,
                parallel: true,
                terserOptions: {
                    format: {
                        comments: true, // 删除注释
                    },
                },
            }),
            new CssMinimizerPlugin({
                parallel: true,
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true }, // 删除注释
                        },
                    ],
                },
            }),
        ],

        // splitChunks: {
        //     chunks: "all",
        //     cacheGroups: {
        //         vendor: {
        //             test: /node_modules/,
        //             priority: 10,
        //             name: "vendor",
        //             minSize: 0
        //         },
        //     }
        // },
        // runtimeChunk: {
        //     name: "runtimeChunk",
        // }
    },
}
