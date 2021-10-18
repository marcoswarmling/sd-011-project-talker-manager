const fs = require('fs').promises;
// const movies = require('../connection/movies');

// const movieNames = async () => {
//   const response = await movies.getMovies();

//   return response.map((e) => e.title);
// };

// const getById = async (id) => {
//   const response = await movies.getMovies();
//   return response
//     .filter((movies) => movies.id === Number(id))
//     .map((movie) => {
//       return { id: movie.id, title: movie.title };
//     });
// };

// module.exports = {
//   movieNames,
//   getById,
// }

const readContent = async (file) => {
  try {
    const content = await fs.readFile(file, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

module.exports = {
  readContent,
};