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
router.post('/start', gameContoller.newUser);

/* /pergunta (get) */
router.get('/pergunta', (req, res) => {
    let question = gameContoller.getQuestion();

    res.render('pages/pergunta', {
        title: "pergunta",
        question: question
    })
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

/* /perfil (get) (só se der) */
router.get('/perfil', (req, res) => {
    res.send('perfil')
});

module.exports = router;