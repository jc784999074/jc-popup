const path = require('path');
const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-router'
];

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: __dirname + "/www-dev/",
        filename: 'js/[name].dll.js',
        library: '[name]_library'
    },
    resolve:{
        extensions: ['', '.js', '.json']
    },
    plugins: [
        new webpack.DllPlugin({
            path: __dirname + '/manifest.json',
            name: '[name]_library',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};