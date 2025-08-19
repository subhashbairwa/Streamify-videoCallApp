export const capitalize = (str) => {
  if (!str || typeof str !== "string") return ""; // agar undefined/null hai to empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
