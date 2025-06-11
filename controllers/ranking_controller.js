const Ranking = require('../models/ranking')

const getRanking = async function (req, res) {
    try {
        // Acessa o Ranking
        const ranking = new Ranking();

        let rankingList = await ranking.getRanking();

        res.render('pages/ranking', {
            title: "ranking",
            ranking: rankingList,
        });
    } catch (error) {
        // TODO: Mudar pra redirect
        res.render('pages/error', {
            title: "error",
            message: error
        });
    }

}

exports.getRanking = getRanking;