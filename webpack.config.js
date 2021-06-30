const path = require("path"); /* path ya esta disponible en node */

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
  module: [ /* Modulos son como extensiones */
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
  ],
};
