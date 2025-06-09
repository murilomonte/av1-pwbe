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

/**
 * Classe que representa uma questão
 */
class Question {
    getQuestion() {
        // TODO: adicionar verificações

        let question = questions[Math.floor(Math.random() * questions.length)]
        return question;
    }

    getAlternativesById(question_id) {
        // TODO: adicionar verificações

        // TODO: Acessa o banco e retorna as alternativas

        // TODO: Percorre as alternativas e as retorna
        for (let i in questions) {
            if (questions[i].id == question_id) {
                return questions[i].alternatives;
            }
        }
    }
}

module.exports = Question;