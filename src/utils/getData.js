const API = process.env.API /* Asi asignamos la variable de entorno para evitar que se filtre informacion privada como de una api privada o llaves y credenciales */

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;