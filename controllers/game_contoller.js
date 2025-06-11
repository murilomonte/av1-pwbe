const Question = require('../models/question.js');
const User = require('../models/user.js');
const Answer = require('../models/answer.js');

const player = {
    id: undefined, // Pode ser adicionado depois também
    name: undefined, // Assim não precisa definir o undefined
    score: {
        questions: 0,
        correct: 0,
        wrong: 0
    },
    answers: []
}

const questions = [];

const answeredQuestions = [];

const start = async function (req, res) {
    try {
        // Povoa a lista de questões
        const question = new Question();
        let questionList = await question.getQuestion(10);

        for (let i in questionList) {
            // Adiciona toda as questões à lista
            questions.push(questionList[i]);
        }

        // Redireciona para uma pergunta, enviando o objeto do usuário e a questão com suas respectivas alternativas
        res.redirect('question');
    } catch (error) {
        res.render('pages/error', {
            title: "error",
            message: error
        });
    }
};

const end = async function (req, res) {
    try {
        // Cria um novo user com o nome passado
        let userName = req.body.userName;
        const user = new User();

        let userData = await user.create(userName);

        // Adiciona o nome do usuário ao objeto e seu respectivo id
        player.id = userData.id;
        player.name = userData.name;

        for (let i in player.answers) {
            player.answers[i].user_fk = player.id;
        }

        // Salva as respostas no banco para o respectivo usuário
        const answer = new Answer();
        let anwersData = await answer.answerQuestions(player.answers);

        // Redireciona para uma pergunta, enviando o objeto do usuário e a questão com suas respectivas alternativas
        res.redirect('ranking');
    } catch (error) {
        res.render('pages/error', {
            title: "error",
            message: error
        });
    }
}

const getQuestion = function (req, res) {
    try {
        if (player.answers.length > 1 && questions.length == 0) {
            res.render('pages/end', { title: "Fim!", score: player.score }); // TODO: criar página
        } else {
            let question = questions.pop();
            answeredQuestions.push(question)
            res.render('pages/pergunta', { title: "Pergunta!", question: question, score: player.score })
        }
    } catch (error) {
        // TODO: Mudar pra redirect
        res.render('pages/error', {
            title: "error",
            message: error
        });
    }
}

const answerQuestion = function (req, res) {
    try {
        let questionId = req.body.question_id;
        let alternativeId = req.body.alternative_id;
        let isCorrect = false;
        let correctAlternative = undefined;

        let question = answeredQuestions.find(item => item.id == questionId);

        if (!question) {
            throw new Error('Question not found');
        }

        for (let i = 0; i < question.alternatives.length; i++) {
            if (question.alternatives[i].is_correct) {
                correctAlternative = question.alternatives[i].id;
            }
        }

        /* Modifica o player */
        if (correctAlternative == alternativeId) {
            isCorrect = true;
            player.score.correct++;
        } else {
            player.score.wrong++;
        }

        player.answers.push({
            user_fk: undefined,
            question_fk: Number(questionId),
            alternative_fk: Number(alternativeId),
            is_correct: isCorrect
        })

        player.score.questions++;

        // TODO: mudar variáveis para camelCase (sou maluco e misturo os dois dependendo do contexto :D)
        res.json({
            is_correct: isCorrect,
            selected_alternative: alternativeId,
            correct_alternative: correctAlternative
        })
    } catch (error) {
        res.render('pages/error', {
            title: "error",
            message: error
        });
    }

}

exports.start = start;
exports.end = end;
exports.getQuestion = getQuestion;
exports.answerQuestion = answerQuestion;