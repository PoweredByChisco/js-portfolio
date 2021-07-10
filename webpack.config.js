const path = require("path"); /* path ya esta disponible en node */
const HtmlWebpackPlugin = require("html-webpack-plugin"); /* Requerimos un comando */
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); /* Para css */

module.exports = {
  entry:
    "./src/index.js" /* Definimos el punto de entrada, por defecto es index.js */,
  output: {
    path: path.resolve(
      __dirname,
      "dist"
    ) /* Usamos resolve para obtener automaticamente la direccion de nuestro directorio donde estamos trabajando */,
    filename: "main.js",
  } /* Por defecto el punto de salida es dist, pero lo podemos cambiar */,
  resolve: {
    extensions: [
      ".js",
    ] /* Especificamos las extensiones de archivo con los que vamos a trabajar */,
  },
  module: {
    rules: [
      /* Modulos son como extensiones */
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        /* Correspondiente a CSS */ test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }) /* Con esto generaremos un archivo HTML con un punto de entrada (template) en el dist */,
    new MiniCssExtractPlugin(),
  ],
};
