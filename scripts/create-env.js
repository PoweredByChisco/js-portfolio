const fs = require("fs"); /* fs significa filesystem el cual nos permite tarbajar con el sistema operativo */

fs.writeFileSync(
  "./.env",
  `API=${process.env.API}\n`
); /* Crearemos en el sistema en una carpeta ademas de llenarlo con la informacion de la api que creamos, esta informacion se la pasaremos al servidor en netlify porque recuerda que sigue sin poder a acceder a la informacion de la API */
