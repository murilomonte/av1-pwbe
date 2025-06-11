const pool = require('../db/database.js');

class Ranking {
    async getRanking() {
        // TODO: adicionar verificações
        const rankingQuery = 'SELECT * from user_ranking';
        let rankingResult = await pool.query(rankingQuery);
        return rankingResult.rows;
    }
}

module.exports = Ranking;