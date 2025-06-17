const pool = require('../db/database.js');
const { errorToString } = require('../utils/error_string.js');
class Question {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    // Pega uma lista de question e retorna uma lista de Question já validaddos
    // para cada question criado, valida os dados
    getQuestions(quantity = 1) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            // Erro de implementação
            throw Error('Invalid number of questions.');
        }

        return new Promise((resolve, reject) => {
            let questionQuery = 'SELECT * FROM questions ORDER BY RANDOM() LIMIT $1';
            let questionList = [];

            pool.query(questionQuery, [quantity], (error, result) => {
                if (error) {
                    reject('Erro ao obter as questões:', error);
                }

                for (let i in result.rows) {
                    let question = new Question({
                        id: Number(result.rows[i].id),
                        description: String(result.rows[i].description),
                        alternatives: []
                    });
                    
                    let validate = question.validate();

                    if (!validate.ok) {
                        reject('Erro ao validar a questão:', errorToString(question.errors));
                    } else {
                        questionList.push(question);
                    }
                }
                resolve(questionList);
            });
        });
    }

    // Valida os campos de this.data
    validate() {
        let description = this.data.description;

        if (typeof description != 'string') {
            this.errors.push('Formato de description inválido.');
        }

        if (this.errors.length == 0) {
            return { ok: true, errors: [] };
        }
        return { ok: false, errors: this.errors };
    }
}

module.exports = Question;