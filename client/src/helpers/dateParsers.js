export function parseDateToSetMaxDate() {
  // Toma la fecha actual y la parsea para generar una fecha formato yyyy-MM-dd, el cual es el formato que maneja el input date del formulario.
  let dateNow = new Date();
  let parsedToJSON = dateNow.toJSON();
  let maxDateAllowed = parsedToJSON.split("T")[0];
  return maxDateAllowed;
  //ej: maxDateAllowed = '2022-11-26'
}
