const pool = require('../db/database.js');
const { errorToString } = require('../utils/error_string.js');

class Answer {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    validate() {
        let user_fk = this.data.user_fk;
        let question_fk = this.data.question_fk;
        let alternative_fk = this.data.alternative_fk;
        let is_correct = this.data.is_correct;

        if (!Number.isInteger(user_fk)) {
            this.errors.push('Formato de user_fk inválido.');
        }

        if (!Number.isInteger(question_fk)) {
            this.errors.push('Formato de question_fk inválido.');
        }

        if (!Number.isInteger(alternative_fk)) {
            this.errors.push('Formato de alternative_fk inválido.');
        }

        if (typeof is_correct != 'boolean') {
            this.errors.push('Formato is_correct description inválido.');
        }

        if (this.errors.length == 0) {
            return { ok: true, errors: [] };
        }
        return { ok: false, errors: this.errors };
    }

    answerQuestion() {
        return new Promise((resolve, reject) => {
            let user_fk = this.data.user_fk;
            let question_fk = this.data.question_fk;
            let alternative_fk = this.data.alternative_fk;
            let is_correct = this.data.is_correct;

            let validate = this.validate();
            if (!validate.ok) {
                reject('Resposta com dados inválidos:', errorToString(validate.errors));
            }

            const answerQuery = 'INSERT INTO answers(user_fk, question_fk, alternative_fk, is_correct) VALUES ($1, $2, $3, $4) RETURNING id';
            const parameters = [
                user_fk,
                question_fk,
                alternative_fk,
                is_correct
            ];

            pool.query(answerQuery, parameters, (error, result) => {
                if (error) {
                    reject('Não foi possível adicionar a resposta:', error);
                } else {
                    this.data.id = result.rows[0];
                    resolve(result.rows[0].id)
                }
            });
        });
    }
}

module.exports = Answer;