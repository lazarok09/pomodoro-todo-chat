export const getRandomId = () => {
  let number = Math.random() * 12000;
  number = number + 3572 * number;
  return number;
};
