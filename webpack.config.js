var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',        //__dirname是一个nodejs变量，表示当前js文件所在的目录
        filename: 'zainMVVM.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader' ,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
