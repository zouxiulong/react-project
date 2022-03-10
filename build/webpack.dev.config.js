const webpack = require("webpack")

module.exports = {
    devtool: "eval-cheap-module-source-map",
    plugins: [new webpack.HotModuleReplacementPlugin()],

    devServer: {
        hot: true,
        port: process.env.PORT || 8080,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
}
