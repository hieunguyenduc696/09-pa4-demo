export const arrayToRecord = (array, key) => {
  return array.reduce((prev, curr) => {
    if (curr.children) {
      return {
        ...prev,
        [curr?.[key]]: {
          ...curr,
          children: arrayToRecord(curr.children, key),
        },
      };
    }
    return {
      ...prev,
      [curr?.[key]]: curr,
    };
  }, {});
};
