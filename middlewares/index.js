const getTalker = require('./getTalker');
const getId = require('./getId');
const login = require('./login');
const postTalker = require('./postTalker');
const deleteTalker = require('./deleteTalker');
const { 
    validationToken,
    validationName,
    validationAge,
    validationDate,
    validationRate,
    validationTalk,
} = require('./validations');
const putTalker = require('./putTalker');

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