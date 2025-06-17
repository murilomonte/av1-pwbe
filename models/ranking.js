const pool = require('../db/database.js');
const { errorToString } = require('../utils/error_string.js');

class Ranking {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    validate() {
        let name = this.data.name;
        let total_answers = this.data.total_answers;
        let correct_answers = this.data.correct_answers;
        let wrong_answers = this.data.wrong_answers;

        if (typeof name != 'string') {
            this.errors.push('Formato de name inválido.');
        }

        if (!Number.isInteger(total_answers)) {
            this.errors.push('Formato de total_answers inválido.');
        }

        if (!Number.isInteger(correct_answers)) {
            this.errors.push('Formato de correct_answers inválido.');
        }

        if (!Number.isInteger(wrong_answers)) {
            this.errors.push('Formato de wrong_answers inválido.');
        }

        if (this.errors.length == 0) {
            return { ok: true, errors: [] };
        }
        return { ok: false, errors: this.errors };
    }

    async getRanking() {
        // TODO: adicionar verificações
        const rankingQuery = 'SELECT * from user_ranking';
        let rankingResult = await pool.query(rankingQuery);
        return rankingResult.rows;
    }

    getRanking() {
        return new Promise((resolve, reject) => {
            const rankingQuery = 'SELECT * from user_ranking';
            let rankingList = [];

            pool.query(rankingQuery, [], (error, result) => {
                if (error) {
                    reject('Erro ao obter o ranking:', error);
                }

                for (let i in result.rows) {
                    let ranking = new Ranking({
                        name: String(result.rows[i].name),
                        total_answers: Number(result.rows[i].total_answers),
                        correct_answers: Number(result.rows[i].correct_answers),
                        wrong_answers: Number(result.rows[i].wrong_answers),
                    })

                    let validate = ranking.validate();

                    if (!validate.ok) {
                        reject('Erro ao validar o ranking:', errorToString(validate.errors));
                    } else {
                        rankingList.push(ranking);
                    }
                }
                resolve(rankingList);
            })
        });
    }


}

module.exports = Ranking;