const getTalker = require('./getTalker');
const getId = require('./getId');
const login = require('./login');
const { 
    validationToken,
    validationName,
    validationAge,
    validationData,
    validationTalk,
} = require('./validations');

module.exports = { 
    getTalker, 
    getId,
    login,
    validationToken,
    validationName,
    validationAge,
    validationData,
    validationTalk,
};
