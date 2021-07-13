const path = require("path"); /* path ya esta disponible en node */
const HtmlWebpackPlugin = require("html-webpack-plugin"); /* Requerimos un comando */
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); /* Para css */
const CopyPlugin = require("copy-webpack-plugin"); /* Para el plugin que copia y pega nuestros recursos de media */
const Dotenv = require("dotenv-webpack") /* Para las variables de entorno */



module.exports = {
  entry:
    "./src/index.js" /* Definimos el punto de entrada, por defecto es index.js */,
  output: {
    path: path.resolve(
      __dirname,
      "dist"
    ) /* Usamos resolve para obtener automaticamente la direccion de nuestro directorio donde estamos trabajando */,
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]"
  }, /* Por defecto el punto de salida es dist, pero lo podemos cambiar */
  mode: "development",
  watch: true,
  resolve: {
    extensions: [
      ".js",
    ], /* Especificamos las extensiones de archivo con los que vamos a trabajar */
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    }
  },

  module: { /* Modulos son como extensiones */
    rules: [
      /* En las reglas decimos que va a leer webpack (a traves de expresiones regulares) y que loader usara para el manejo de estos archivos */
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
      { /* Para la carga de fuentes */
        test: /\.(woff|woff2)$/, 
        use: {
          loader: "url-loader",
          options: {
            limit: 10000, 
            mimetype: "application/font-woff", /* Tipo de dato a utilizar */
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }) /* Con esto generaremos un archivo HTML con un punto de entrada (template) en el dist */,
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
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
    new Dotenv() /* Asi añadimos las variables de entorno */
  ],
};
