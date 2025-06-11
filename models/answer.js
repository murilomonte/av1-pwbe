const pool = require('../db/database.js');

class Answer {
    // responde várias perguntas
    async answerQuestions(answersList) {
        // https://github.com/brianc/node-postgres/issues/1644#issuecomment-595231696

        const answerQuery = `INSERT INTO 
            answers(user_fk, question_fk, alternative_fk, is_correct) 
        SELECT 
            user_fk, question_fk, alternative_fk, is_correct 
        FROM 
            jsonb_to_recordset($1::jsonb) AS t (user_fk INT, question_fk INT, alternative_fk INT, is_correct BOOLEAN)`;
        
        let parameters = answersList;

        let answerResult = await pool.query(answerQuery, [ JSON.stringify(parameters) ]);
    }
}

module.exports = Answer