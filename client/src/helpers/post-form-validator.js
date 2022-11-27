export function postFormValidator({
  name_on_doc,
  number_on_doc,
  country_found,
  date_found,
}) {
  if ((!name_on_doc && !number_on_doc) || !country_found || !date_found)
    return false;
  return true;
}
