const getTalker = require('./getTalker');
const getId = require('./getId');
const login = require('./login');
const postTalker = require('./postTalker');
const { 
    validationToken,
    validationName,
    validationAge,
    validationDate,
    validationRate,
    validationTalk,
} = require('./validations');
const putTalker = require('./putTalker');
const deleteTalker = require('./deleteTalker');

module.exports = { 
    getTalker, 
    getId,
    login,
    postTalker,
    putTalker,
    deleteTalker,
    validationToken,
    validationName,
    validationAge,
    validationDate,
    validationRate,
    validationTalk,
};
