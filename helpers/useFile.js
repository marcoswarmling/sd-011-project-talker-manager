const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return ({ message: err.message, code: err.code });
  }
};

// const writeContentFile = async (path, content) => {
//   try {
//     const arrContent = await readContentFile(path);

//     arrContent.push(content);
//     await fs.writeFile(path, JSON.stringify(content));

//     return content;
//   } catch (err) {
//     return ({ message: err.message, code: err.code });
//   }
// };

module.exports = { readContentFile };
