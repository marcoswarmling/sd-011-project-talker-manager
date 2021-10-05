const getRandomNumb = () => {
  let result = Math.floor(Math.random() * 75) + 48;
  if (
      (result > 57 && result < 65)
      || (result > 90 && result < 97)
  ) result = getRandomNumb();

  return result;
};

// Font: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
const getToken = (n) => {
  const arrOfRandNumb = Array.from({ length: n }, getRandomNumb);
  const token = String.fromCharCode(...arrOfRandNumb);

  return token;
};

module.exports = getToken;
