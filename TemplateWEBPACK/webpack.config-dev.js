const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        loading:'./src/loading.js',
        index:'./src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle-[name].js?_=[chunkhash:8]'
    },
    module: {
        rules: [
        {
            test: /\.(png|jpg|gif)$/,
            use: [
            {
                loader: 'url-loader',
                options: {
                name:'./images/[name].[ext]',
                esModule:false,
                limit: 0
                }
            }
            ]
        },
        {
            test: /\.(mp3|aac|m4a|mp4)$/,
            use: [
            {
                loader: 'url-loader',
                options: {
                name:'./meida/[name].[ext]',
                esModule:false,
                limit: 0
                }
            }
            ]
        },
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
        },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template:'inline-html-withimg-loader!'+path.resolve(__dirname, './public/index.html'),
        filename: 'index.html',
        inject:false,
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
        { from: path.join(__dirname,'public/images/ics.png'), to:  path.join(__dirname,'dist/images/ics.png') }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        proxy: {
        "/request": "http://127.0.0.1"
        }
    },
};