export function formValidator({ name, number, country, date_lost }) {
  if (!name || !number || !country || !date_lost) return false;
  return true;
}
