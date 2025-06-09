const Question = require('../models/question.js');

exports.getQuestion = function () {
    // TODO: adicionar verificações

    // Pede para o Question uma questão
    const question = new Question();
    const questionItem = question.getQuestion();

    // Devolve para o router
    return questionItem;
}

exports.newUser = function (req, res, name) {
    // TODO: adicionar verificações

    // Acessa o User e adiciona um novo usuário

    // Redirecion para uma nova pergunta
}


/**
 * @param {int} question_id 
 * @param {int} alternative_id 
 * @returns {object}
 */
exports.answerQuestion = function (question_id, selected_alternative) {
    // TODO: adicionar verificações

    // TODO: Verifica se o usuário já respondeu a questão

    // Se sim, não registra do banco

    // Se não, continua

    // Acessa o Alternative pelo id da Question e verifica se uma questão está correta.
    let is_correct = false;
    let correct_alternative = 0;

    const question = new Question();
    const alternatives = question.getAlternativesById(question_id)

    for (let i in alternatives) {
        if (alternatives[i].is_correct) {
            correct_alternative = alternatives[i].id;
        }

        if (alternatives[i].id == selected_alternative) {
            if (alternatives[i].is_correct) {
                is_correct = true;
            }
        }
    }
    // TODO: Acessa o User e atualiza o status do jogador.

    // Retornar um objeto informando se está correto e o id da alternativa
    return {
        is_correct: is_correct,
        selected_alternative: selected_alternative,
        correct_alternative: correct_alternative
    }
}
