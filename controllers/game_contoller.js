const Question = require('../models/question.js');
const User = require('../models/user.js');
const Answer = require('../models/answer.js');
const Alternative = require('../models/alternative.js');

let player = {}
let questions = [];
let answeredQuestions = [];

const start = async function (req, res) {
    try {
        // Zera o user e as questions
        player = {
            id: undefined,
            name: undefined,
            score: {
                questions: 0,
                correct: 0,
                wrong: 0
            },
            answers: []
        };

        questions = [];
        answeredQuestions = [];

        // Povoa a lista de questões
        // TODO: usar .then ao invés de await
        const question = new Question();
        let questionList = await question.getQuestions(2);

        const alternative = new Alternative();

        for (let i in questionList) {
            let alternativeList = await alternative.getAlternativesById(questionList[i].data.id);
            questionList[i].data.alternatives = alternativeList;
        }

        // Adicionando todas as questões à lista
        questions = questionList;

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
        const user = new User({
            name: userName,
        });

        // Cria o user
        await user.create();

        // Adiciona o nome do usuário ao objeto e seu respectivo id
        player.id = user.data.id;
        player.name = user.data.name;

        for (let i in player.answers) {
            player.answers[i].user_fk = player.id;
        }

        for (let i in player.answers) {
            // Instancia todas as questions
            let answer = new Answer({
                user_fk: Number(player.answers[i].user_fk),
                question_fk: Number(player.answers[i].question_fk),
                alternative_fk: Number(player.answers[i].alternative_fk),
                is_correct: player.answers[i].is_correct
            });

            // Responde
            await answer.answerQuestion();
        }

        // Redireciona ao ranking
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

        let question = answeredQuestions.find(item => item.data.id == questionId);

        if (!question) {
            throw new Error('Questão não encontrada.');
        }

        for (let i = 0; i < question.data.alternatives.length; i++) {
            if (question.data.alternatives[i].data.is_correct) {
                correctAlternative = question.data.alternatives[i].data.id;
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