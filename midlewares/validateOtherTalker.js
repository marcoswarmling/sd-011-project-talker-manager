// Requisito 4 pt3
function tokenIsValid(req, res) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token não encontrado' });

    if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
}

// 

function nameIsValid(req, res) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 6 caracteres' });
    }
}

// 

function ageIsValid(req, res) {
    const { age } = req.body;

    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
}
}

//

function talkIsValid(req, res) {
    const { talk } = req.body;

    if (!talk) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
}

// 

function watchedAtIsValid(req, res) {
    const { talk } = req.body;

    if (!talk.watchedAt) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }

    if (
        talk.watchedAt.split('/')[0].length !== 2
        || talk.watchedAt.split('/')[1].length !== 2
        || talk.watchedAt.split('/')[2].length !== 4
    ) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
}

// 

function rateIsValid(req, res) {
    const { talk } = req.body;

    if (!talk.rate) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }

    if (talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }
}

module.exports = {
    tokenIsValid,
    nameIsValid,
    ageIsValid,
    talkIsValid,
    watchedAtIsValid,
    rateIsValid };
