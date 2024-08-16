export const getTextForValue = (value, ranges) => {
  for (let range of ranges) {
    if (value >= range.min && value <= range.max) {
      return range.text;
    }
  }
  return '';
};