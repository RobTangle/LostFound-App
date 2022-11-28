export const subscriptionForm = {
  title: "Suscribirse a alerta",
  subtitle:
    "Completá el formulario para suscribirte a una alerta en caso de que alguien encuentre tus documentos. Si alguien publica que encontró documentación perdida que coincide con los datos de tu subscripción, automáticamente se te enviará un email avisándote.",
  nameLabel: "Nombre completo",
  namePlaceholder: "Juan Pérez",
  numberLabel: "DNI / Número de Tarjeta",
  numberPlaceholder: "34.523.110 / 65-39201/04",
  countryLabel: "País donde los perdiste",
  selectCountry: "Seleccion un país",
  dateLabel: "Fecha en que los perdiste",
  submitButton: "Crear subscripción",
  //errors:
  errorNameAndNumberFalsy:
    "Debe ingresar el nombre completo en el documento y/o el número en el documento.",
  errorNameLength: "El nombre es demasiado largo. Ingrese máximo 60 caracteres",
  errorNumberLength:
    "El número en el documento es demasiado largo. Ingrese máximo 50 caracteres",
  errorStringContainsURLs: "No ingrese URLs",
  errorCountryInvalid: "El país ingresado es inválido.",
  errorDateFalsy:
    "Por favor, ingrese la fecha en la que encontró el documento.",
  errorDateInvalid: "La fecha ingresada es inválida.",
};
