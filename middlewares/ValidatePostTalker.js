const express = require('express');

 const validateToken = (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).send({"message": "Token não encontrado"})
    } else if (authorization.length < 16){ 
       return res.status(401).send({"message": "Token inválido"})
    }
    next();
}

const validateName = (req, res, next) => {
    const {name} = req.body
if (!name) { 
    return res.status(400).send({"message": "O campo \"name\" é obrigatório"})
}else if (name.length < 3){
    return res.status(400).send({"message": "O \"name\" deve ter pelo menos 3 caracteres"})
}
next()
}

const validateAge = (req, res, next) => {
    const {age} = req.body
    if(!age){
        return res.status(400).send({"message": "O campo \"age\" é obrigatório"})
    }else if (age < 18) {
        return res.status(400).send({"message": "A pessoa palestrante deve ser maior de idade"})
    }
    next()
}

const validateTalk = (req, res, next) => {
    const {talk} = req.body
    const dataRegex = /(\d{2})[/](\d{2})[/](\d{4})/;
    const rateRegex = /^[1-5]{0,1}$/;

    if (!talk || !talk.watchedAt || !talk.rate){
        return res.status(400).send({"message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios"})
    }else if(!dataRegex.test(talk.watchedAt)){
        return res.status(400).send({"message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""})
    }else if(!rateRegex.test(talk.rate)){
        return res.status(400).send({"message": "O campo \"rate\" deve ser um inteiro de 1 à 5"})
    }
    next()
}

module.exports = {
    validateToken,
    validateAge,
    validateName,
    validateTalk,
}

