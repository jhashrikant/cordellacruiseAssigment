
function isObject(val) {
  if (val === null) return false
  return typeof val === "object"
}

function parseCustomDate(dateString) {
  // Split the string into day, month, and year
  const [day, month, year] = dateString.split('/').map(Number);

  // Create a new Date object using the parts
  return new Date(year, month - 1, day); // month is 0-based
}

const API_URL = "https://staging.cordeliacruises.com/api/v2/itineraries?pagination=false";

export { parseCustomDate, isObject ,API_URL }

