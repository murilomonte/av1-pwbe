const pool = require('../db/database.js');

/**
 * Classe que representa uma questão
 */
class Question {

    /**
     * Returns a random question
     */
    async getQuestion(qnt = 1) {
        let question_query = 'SELECT * FROM questions ORDER BY RANDOM() LIMIT $1';
        let question_result = await pool.query(question_query, [qnt])
        let question_list = [];

        for (let i in question_result.rows) {
            let question = question_result.rows[i];
            let alternatives = await this.getAlternativesById(question.id);

            question_list.push(this.toMap(question.id, question.description, alternatives))
        }
        return question_list;
    }

    async getAlternativesById(question_id) {
        // TODO: adicionar verificações

        // Rertorna as alternativas da questão
        const alternative_query = 'SELECT * FROM Alternatives as a WHERE a.question_fk = $1'
        let alternatives_result = await pool.query(alternative_query, [question_id])
        return alternatives_result.rows;

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