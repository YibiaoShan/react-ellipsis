const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
 template: path.join(__dirname, "examples/index.html"),
 filename: "./index.html"
});
module.exports = {
 entry: path.join(__dirname, "examples/index.js"),
 module: {
   rules: [{
     test: /\.(js|jsx)$/,
   
     use: {
      //使用babel-loader
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    },
   exclude: /node_modules/
 },{
   test: /\.css$/,
   use: ["style-loader", "css-loader"]
 }]
},
 plugins: [htmlWebpackPlugin],
 resolve: {
   extensions: [".js", ".jsx"]
 },
 devServer: {
   port: 3001
}};
