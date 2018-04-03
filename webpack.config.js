/* webpack.config */
var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    cache:true,
    debug: true,
    devtool: 'source-map',
    entry: {
        vendor: ['react','react-dom'],
        index: ['./src/index']
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        publicPath: "../",
        path: __dirname + "/www-dev/",
        contentBase:__dirname + "/src/",
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
        new ExtractTextPlugin('[name][hash:6].css'),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index/index.html',
            hash: false,
            filename: 'index.html',
            chunks: ['vendor', 'index'],
            inject: 'body',
            minify: {
                collapseWhitespace: false
            }
        })
    ]
};
