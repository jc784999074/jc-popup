/* webpack.config */
var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        vendor: ['react', 'react-dom', 'react-router','react-motion'],
        index: ['./src/login']
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        publicPath: "",
        path: __dirname + "/www-prod/",        
        filename: "js/[name].[hash:6].js",
        chunkFilename: "js/pages/[name].[chunkhash:6].js"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel",
                include:[path.join(__dirname + '/src')],
                query: {
                    cacheDirectory: true
                }
            }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.less$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            },
            {test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=2500" },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin('[name][hash:6].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        }),       
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index/index.html',
            hash: false,
            filename: 'index.html',
            chunks: ['vendor', 'index'],
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        })
    ]
};