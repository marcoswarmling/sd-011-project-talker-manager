// // ------- Requisito 4: crie endpoint post/talker ------
// // Valida o token:
// const tokenValidation = (req, res, next) => {
//     const { tokenValido } = req.body;
// // retorna erro caso o token não seja digitada:
// if (!tokenValido) {
//     return res.status(401).json({ message: 'Token não encontrado' });
// }

// // retorna erro caso o token tenha menos de 16 caracteres:
// if (tokenValido.length < 16) {
//     return res.status(401).json({ message: 'Token inválido' });
// }
// next();
// };

// // Valida o nome:
// const nameValidation = (req, res, next) => {
//     const { nomeValido } = req.body;
// // retorna erro caso o nome não seja digitado:
// if (!nomeValido) {
//     return res.status(400).json({ message: 'O campo name é obrigatório' });
// }

// // retorna erro caso o nome tenha menos de 3 caracteres:
// if (nomeValido.length < 3) {
//     return res.status(400).json({ message: 'O name deve ter pelo menos 3 caracteres' });
// }
// next();
// };

// // Valida a idade:
// const ageValidation = (req, res, next) => {
//     const { idadeValida } = req.body;
// // retorna erro caso a idade não seja digitada:
// if (!idadeValida) {
//     return res.status(400).json({ message: 'O campo age é obrigatório' });
// }

// // retorna erro caso a idade seja inferior a 18:
// if (idadeValida.length < 18) {
//     return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
// }
// next();
// };

// // Valida o obj talker:
// const talkValidation = (req, res, next) => {
//     const { talk: { rate, watchedAt } } = req.body;

//     // regex para validar o formato da data:
//     const REGEX_VALID_DATE = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

// // retorna erro caso a data não esteja no formato adequado:
// if (!watchedAt.match(REGEX_VALID_DATE)) {
//     return res.status(400).json({ message: 'O campo watchedAt deve ter o formato dd/mm/aaaa' });
// }

// // retorna erro caso a idade seja inferior a 18:
// if (rate < 1 || rate > 5) {
//     return res.status(400).json({ message: 'O campo rate deve ser um inteiro de 1 à 5' });
// }
// next();
// };

// module.exports = {
//     tokenValidation,
//     nameValidation,
//     ageValidation,
//     talkValidation,
// };
