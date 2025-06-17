const pool = require('../db/database.js');
const { errorToString } = require('../utils/error_string.js');

class Alternative{
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    // Valida os campos de this.data
    validate() {
        let description = this.data.description;
        let question_fk = this.data.question_fk;
        let is_correct = this.data.is_correct;
        
        if (!Number.isInteger(question_fk)) {
            this.errors.push('Formato de question_fk inválido.');
        }

        if (typeof description != 'string') {
            this.errors.push('Formato de description inválido.');
        }

        if (typeof is_correct != 'boolean') {
            this.errors.push('Formato is_correct description inválido.');
        }

        if (this.errors.length == 0) {
            return { ok: true, errors: [] };
        }
        return { ok: false, errors: this.errors };
    }

    async getAlternativesById(question_id) {
        if (!Number.isInteger(question_id)) {
            // Erro de implementação
            throw Error('Invalid question id.');
        }

        return new Promise((resolve, reject) => {
            let alternativeQuery = 'SELECT * FROM Alternatives as a WHERE a.question_fk = $1';
            let alternativeList = [];

            pool.query(alternativeQuery, [question_id], (error, result) => {
                if (error) {
                    reject('Erro ao obter as alternativas:', error);
                }

                for (let i in result.rows) {

                    let alternative = new Alternative({
                        id: Number(result.rows[i].id),
                        description: String(result.rows[i].description),
                        question_fk: Number(result.rows[i].question_fk),
                        is_correct: result.rows[i].is_correct,
                    });
                    
                    let validate = alternative.validate();

                    if (!validate.ok) {
                        // Fix: Errors voltando como list
                        reject('Erro ao validar a questão:', errorToString(validate.errors));

                    } else {
                        alternativeList.push(alternative);
                        resolve(alternativeList);
                    }
                }
            });
        });
    }
}

module.exports = Alternative;