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

module.exports = { 
    getTalker, 
    getId,
    login,
    postTalker,
    validationToken,
    validationName,
    validationAge,
    validationDate,
    validationRate,
    validationTalk,
};
