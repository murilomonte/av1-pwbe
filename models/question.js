let questions = [
    {
        "id": 1,
        "description": "Qual a capital do Brasil?",
        "alternatives": [
            {
                "id": 1,
                "description": "Xique-Xique",
                "is_correct": false,
                "question_fk": 1
            },
            {
                "id": 2,
                "description": "Nova Iorque",
                "is_correct": false,
                "question_fk": 1
            },
            {
                "id": 3,
                "description": "Brasília",
                "is_correct": true,
                "question_fk": 1
            }
        ]
    },
    {
        "id": 2,
        "description": "Qual é o maior planeta do sistema solar?",
        "alternatives": [
            {
                "id": 4,
                "description": "Terra",
                "is_correct": false,
                "question_fk": 2
            },
            {
                "id": 5,
                "description": "Júpiter",
                "is_correct": true,
                "question_fk": 2
            },
            {
                "id": 6,
                "description": "Marte",
                "is_correct": false,
                "question_fk": 2
            }
        ]
    },
    {
        "id": 3,
        "description": "Qual linguagem é usada para estilizar páginas web?",
        "alternatives": [
            {
                "id": 7,
                "description": "HTML",
                "is_correct": false,
                "question_fk": 3
            },
            {
                "id": 8,
                "description": "JavaScript",
                "is_correct": false,
                "question_fk": 3
            },
            {
                "id": 9,
                "description": "CSS",
                "is_correct": true,
                "question_fk": 3
            }
        ]
    },
    {
        "id": 4,
        "description": "Quem escreveu 'Dom Casmurro'?",
        "alternatives": [
            {
                "id": 10,
                "description": "Machado de Assis",
                "is_correct": true,
                "question_fk": 4
            },
            {
                "id": 11,
                "description": "Clarice Lispector",
                "is_correct": false,
                "question_fk": 4
            },
            {
                "id": 12,
                "description": "Monteiro Lobato",
                "is_correct": false,
                "question_fk": 4
            }
        ]
    }
];

const pool = require('../db/database.js');

/**
 * Classe que representa uma questão
 */
class Question {

    async getQuestion() {
        // TODO: adicionar verificações

        // Retorna uma question que o usuário não completou
        let userId = 1;
        let question_query = 'SELECT q.* FROM Questions q WHERE q.id NOT IN (SELECT a.question_fk FROM Answers a WHERE a.user_fk = $1) ORDER BY RANDOM() LIMIT 1';

        let question_result = await pool.query(question_query, [userId])

        return question_result.rows[0];
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