const express = require('express');
const router = express.Router();

const gameContoller = require('../controllers/game_contoller.js');

/* / (get) */
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: "home"
    })
});

/* /start (get) */
router.post('/start', async (req, res) => {
    let userName = req.body.userName;
    let userResponse = gameContoller.newUser(userName);

    if (userResponse.success) {
        let questionResponse = await gameContoller.getQuestion();

        if (questionResponse.success) {
            res.render('pages/pergunta', {
                title: "pergunta",
                question: questionResponse.result
            });
        } else {
            res.render('pages/error', {
                title: "error",
                message: questionResponse.result
            });
        }
    } else {
        res.render('pages/error', {
            title: "error",
            message: userResponse.message
        });
    };
});

/* /pergunta (get) */
router.get('/pergunta', async (req, res) => {
    let question = gameContoller.getQuestion();
    console.log(question)

    let questionResponse = await gameContoller.getQuestion();

    if (questionResponse.success) {
        res.render('pages/pergunta', {
            title: "pergunta",
            question: questionResponse.result
        });
    } else {
        res.render('pages/error', {
            title: "error",
            message: questionResponse.result
        });
    }
});

/* /pergunta (post) */
router.post('/pergunta', (req, res) => {
    let question_id = req.body.question_id;
    let alternative_id = req.body.alternative_id;

    let response = gameContoller.answerQuestion(question_id, alternative_id);

    res.json({
        is_correct: response.is_correct,
        selected_alternative: response.selected_alternative,
        correct_alternative: response.correct_alternative
    })
});

/* /ranking (get) */
router.get('/ranking', (req, res) => {
    res.send('ranking')
});

module.exports = router;