const express = require('express');
const router = express.Router();

const gameContoller = require('../controllers/game_contoller.js');
const rankingController = require('../controllers/ranking_controller.js');

/* / (get) */
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: "home"
    })
});

router.post('/end', gameContoller.end)

/* /start (get) */
router.get('/start', gameContoller.start);

/* /pergunta (get) */
router.get('/question', gameContoller.getQuestion);

/* /pergunta (post) */
router.post('/question', gameContoller.answerQuestion);

/* /ranking (get) */
router.get('/ranking', rankingController.getRanking);

module.exports = router;