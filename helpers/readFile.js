// feito com base nos exercicios do course - express middlewares
const fs = require('fs');

const readContentTalker = async (path) => {
    try {
      const contentTalker = await fs.readFileSync(path, 'utf-8');
      return JSON.parse(contentTalker);
    } catch (error) {
        return null;
    }
};

module.exports = {
    readContentTalker,
};