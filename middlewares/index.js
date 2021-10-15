const getTalker = require('./getTalker');
const getId = require('./getId');
const login = require('./login');
const postTalker = require('./postTalker');
const { 
    validationToken,
    validationName,
    validationAge,
    validationTalk,
    validationDate,
    validationRate,
} = require('./validations');

module.exports = { 
    getTalker, 
    getId,
    login,
    postTalker,
    validationToken,
    validationName,
    validationAge,
    validationTalk,
    validationDate,
    validationRate,
};
