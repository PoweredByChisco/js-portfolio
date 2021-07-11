const path = require("path"); /* path ya esta disponible en node */
const HtmlWebpackPlugin = require("html-webpack-plugin"); /* Requerimos un comando */
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); /* Para css */
const CopyPlugin = require("copy-webpack-plugin"); /* Para el plugin que copia y pega nuestros recursos de media */


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
        /* Correspondiente a CSS */ test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      { test: /\.png/, type: "asset/resource" }, /* Para poder importar nuestras imagenes */
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }) /* Con esto generaremos un archivo HTML con un punto de entrada (template) en el dist */,
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            "src",
            "assets/images"
          ) /* Obtiene la dirreccion de nuestras imagenes */,
          to: "assets/images" /* Indica a donde se van a copuar nuestros archivos en nuestro dist */,
        },
      ],
    }),
  ],
};
