const pool = require('../db/database.js');

/**
 * Classe que representa uma questão
 */
class Question {
    async getQuestion(qnt = 1) {
        try {
            if (!Number.isInteger(qnt)) {
                throw new Error('qnt precisa ser um número inteiro.');
            }

            if (qnt < 1) {
                throw new Error('qnt precisa ser maior que 0.');
            }

            let question_query = 'SELECT * FROM questions ORDER BY RANDOM() LIMIT $1';
            let question_result = await pool.query(question_query, [qnt])
            let question_list = [];

            for (let i in question_result.rows) {
                let question = question_result.rows[i];
                let alternatives = await this.getAlternativesById(question.id);

                question_list.push(this.toMap(question.id, question.description, alternatives))
            }
            // return { sucess: true, result: question_list };
            return question_list;
        } catch (error) {
            console.log(error);
        };
    }

    async getAlternativesById(question_id) {
        try {
            if (!Number.isInteger(question_id)) {
                throw new Error('question id precisa ser um número inteiro.');
            }

            if (question_id < 0) {
                throw new Error('question_id precisa ser maior que 0.');
            }

            // Rertorna as alternativas da questão
            const alternative_query = 'SELECT * FROM Alternatives as a WHERE a.question_fk = $1'
            let alternatives_result = await pool.query(alternative_query, [question_id])
            return alternatives_result.rows;
        } catch (error) {
            console.log(error);
        };
    }

    toMap(id, description, alternatives) {
        let questionObject = {
            id: id,
            description: description,
            alternatives: alternatives
        }
        return questionObject
    }
}

module.exports = Question;