var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var outPath = "/tempMarket/";
var version = "v20160825";
module.exports = {
    entry: {
        "tempDetail": "./src/component/tempDetail/tempDetail.js",
        "tempPortal": "./src/component/tempPortal/tempPortal.js"
    },
    output: {
        path: __dirname + outPath + version,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                "test": /\.vm?$/, "loader": "html"
            },
            /**
             * 大家不要改这里的limit,有的小图标之后要通过url访问
             */
            {
                "test": /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                "loader": "url-loader?limit=1000&name=./images-and-fonts/[name].[ext]"
            },
            {
                "test": /\.less/,
                "loader": 'style-loader!css-loader!less-loader'
            },
            {
                "test": /\.css$/,
                "loader": ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins: [
        // CSS打包成文件必须在JS中require，使用插件打包为文件，不然直接打包到页面行内样式
        new ExtractTextPlugin("[name].css"),
        // 将jQuery和velocityjs导出到window下
        new webpack.ProvidePlugin({
            Velocity: "velocityjs",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};