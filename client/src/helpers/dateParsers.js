export function parseDateToSetMaxDate() {
  // Toma la fecha actual y la parsea para generar una fecha formato yyyy-MM-dd, el cual es el formato que maneja el input date del formulario.
  let dateNow = new Date();
  let parsedToJSON = dateNow.toJSON();
  let maxDateAllowed = parsedToJSON.split("T")[0];
  return maxDateAllowed;
  //ej: maxDateAllowed = '2022-11-26'
}

export function parseDateWithNoHours(date) {
  try {
    if (!date) {
      return null;
    }
    let toUnix = Date.parse(date);
    let unixToNewDate = new Date(toUnix);
    let dateWithNoOurs = unixToNewDate.toLocaleString().split(",")[0];
    return `${dateWithNoOurs}`;
  } catch (error) {
    console.log("Error al convertir a fecha.");
    return null;
  }
}
