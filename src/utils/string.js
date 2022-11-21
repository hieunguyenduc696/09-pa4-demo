const clearAndUpper = (text) => {
  return text.replace(/-/, " ").toUpperCase();
};

export const kebabCaseToPascalCase = (text) => {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
};
