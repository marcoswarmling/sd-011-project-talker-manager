const fs = require('fs');
const crypto = require('crypto');
const TALKER = 'talker.json';

const talkerDataMiddleware = (req, res, next) => {
	const data = JSON.parse(fs.readFileSync(TALKER, 'utf8'));

	req.data = data;

	next();
}

const authMiddleware = (req, res, next) => {
	const { email, password } = req.body;
	console.log(email, password)
	const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

	if (!email || email === '') return res.status(400).json({ message: "O campo \"email\" é obrigatório" });
	if (!regex.test(email)) return res.status(400).json({ message: "O \"email\" deve ter o formato \"email@email.com\"" });
	if (!password || password === '') return res.status(400).json({ message: "O campo \"password\" é obrigatório" });
	if (password.length < 6) return res.status(400).json({ message: "O \"password\" deve ter pelo menos 6 caracteres" });

	next();

}

const getToken = () => {
	const token = crypto.randomBytes(8).toString('hex');
	return token;
}

module.exports = {
	talkerDataMiddleware,
	authMiddleware,
	getToken,
}