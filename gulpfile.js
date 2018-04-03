var path = require('path');
var gulp = require("gulp");
var connect = require('gulp-connect');
var gutil = require("gulp-util");
var fse = require('fs-extra');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var WebPort = 8093;
//开发环境(本地调试)
gulp.task("server", function (callback) {
    // Start a webpack-dev-server
    var WebpackConfig = require("./webpack.config.js");
    var myConfig = Object.create(WebpackConfig);    
    myConfig.entry.index.unshift("webpack-dev-server/client?http://localhost:" + WebPort);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("localhost")
            }
        })
    )
    var compiler = webpack(myConfig);
    console.log("端口"+WebPort);
    new WebpackDevServer(compiler, {
        contentBase: myConfig.output.contentBase,
        hot: true,
        inline:true,
        historyApiFallback: true,
        disableHostCheck: true,
        // 设置代理
        proxy: {
            '/api/*': {
                target: 'https://182.ecloudsign.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        stats: "minimal"
    }).listen(WebPort, function (err) {
        if (err) throw new gutil.PluginError("server", err);
        gutil.log("[server]");
        gutil.log("启动端口:"+WebPort+"");
        callback();
    });
});