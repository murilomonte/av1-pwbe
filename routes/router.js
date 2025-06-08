const express = require('express');
const router = express.Router();

const questionController = require('../controllers/question_controller');

/* / (get) */
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: "home"
    })
});

/* /pergunta (get) */
router.get('/pergunta', (req, res) => {
    res.render('pages/pergunta', {
        title: "pergunta",
        pergunta: questionController.getQuestion
    })
});

/* /pergunta (post) */
router.post('/pergunta', questionController.updateUser);

/* /perfil (get) (só se der) */
router.get('/perfil', (req, res) => {
    res.send('perfil')
});

module.exports = router;