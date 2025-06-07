const express = require('express');
const router = express.Router();

/* / (get) */
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: "home"
    })
});

/* /pergunta (get) */
router.get('/pergunta', (req, res) => {
    res.render('pages/pergunta', {
        title: "pergunta"
    })
});

/* /pergunta (post) */
router.post('/pergunta', (req, res) => {
    res.send('pergunta post')
});

/* /perfil (get) (só se der) */
router.get('/perfil', (req, res) => {
    res.send('perfil')
});

module.exports = router;