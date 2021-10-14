// [AUTOR]: Michel Pereira (becauro).

// [ABOUT]: Bem vindo ao "fieldCheck". Essa função (módulo) criei visando diminuir a complexidade de middlewares que recebem muitos campos.
// Pequena, porém MUITO poderosa.

// [DESCRIÇÃO]: Sabemos que validar um middleware que recebe muitos campos, ou pior,
// alguns desses campos são chaves para um objeto de "subcampos".
// Ter que validar todos esses campos dentro de uma única função de validação, incorremos em
// muitas linhas e a famigerada clomplexidade do ESLinter, não é uma tarefa muito agradável.
// É por isso que surgiu o fieldCheck, uma função genérica de utilidade para ajudar middlewares eliminar issues na validação de seus campos.

// [LÓGICA]: Ao invés de ter que gastar pelo menos umas 5 linhas ( ou deixar uma linha muito larga),
// Apenas usamos esse fieldChecker passando alguns parâmetros que ficariam em linhas diferentes --- geralmente com espaços entre elas.

// [CASES]:
// Já consegui diminuir complexidade de 14 para 3 fazendo combinção com esse fieldChecker
// Já consegui diminuir quase metade de linhas.

// [PARAMENTROS(4)]:
// status: O status de retorno do middleware, de acordo com o "bool" definido.
// msg: A mensagem a ser retornada.
// next: Callback do parâmentro "next" dos middlewares.
// Bool: Um lógica boolean qualquer, usada para validação de um campo.

// [FUTURO]:
// Testar performace.

// [CONTATO]: michelbecauro@gmail.com

module.exports = function fieldChecker(status, msg, next, bool) {
    if (bool) {
  return next({ status, message: msg });
  }
};