// feito com base nos exercicios do course - express middlewares
const fs = require('fs').promises;

const readContentTalker = async (path) => {
    try {
      const contentTalker = await fs.readFile(path, 'utf-8');
      return JSON.parse(contentTalker);
    } catch (error) {
        return null;
    }
};

module.exports = readContentTalker;