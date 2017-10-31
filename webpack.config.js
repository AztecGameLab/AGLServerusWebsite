const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: 'serverus_app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: path.resolve(__dirname, 'serverus_app') + '/index.js',
    output: {
        path: path.resolve(__dirname, 'serverus_app') + '/dist/',
        publicPath: '/',
        filename: 'index_bundle.js'
},
//  devtool : "#source-map",
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=25000'},
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            {
          test: /\.(ico$|\.wav$|\.mp3)$/,
          loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
      }
        ]
    },
    devServer: {
    historyApiFallback: true,
    compress: true,
    disableHostCheck: true
},
    plugins: [HTMLWebpackPluginConfig]
};
