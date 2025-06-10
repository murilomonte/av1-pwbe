const Question = require('../models/question.js');
const User = require('../models/user.js');

exports.getQuestion = async function () {
    // TODO: adicionar verificações

    // Pede para o Question uma questão
    const question = new Question();
    
    try {
        const questionItem = await question.getQuestion();
        const alternatives = await question.getAlternativesById(questionItem.id);
    
        let questionObject = question.toMap(questionItem.id, questionItem.description, alternatives);
        
        return { success: true, result: questionObject};
    } catch (error) {
        return { success: false, result: error};
    }

}

exports.newUser = function (name) {
    // TODO: adicionar verificações

    // Acessa o User e adiciona um novo usuário
    const user = new User();
    let response = user.create(name);

    return response
}


/**
 * @param {int} question_id 
 * @param {int} alternative_id 
 * @returns {object}
 */
exports.answerQuestion = function (question_id, selected_alternative) {
    // TODO: adicionar verificações
    // Se o id é 

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
    // TODO: Acessa o Answer e atualiza o status do jogador.

    // Retornar um objeto informando se está correto e o id da alternativa
    return {
        is_correct: is_correct,
        selected_alternative: selected_alternative,
        correct_alternative: correct_alternative
    }
}
