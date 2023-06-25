export const flattenObject = (obj, parentKey = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};

export const beautifyAddress = (address) => {
  const strsingBeutify =
    address &&
    address
      .replaceAll("_", " ")
      .replaceAll(";", ", ")
      .replaceAll(",", ", ")
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll("=", " ")
      .replaceAll('"', "")
      .replaceAll("address", "")
      .replaceAll("  ", "");
  return strsingBeutify;
};
