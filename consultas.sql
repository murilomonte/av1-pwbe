-- Todos as questões e suas respectivas respostas
SELECT q.description, a.description 
FROM Questions as q, Alternatives as a 
WHERE a.question_fk = q.id AND a.is_correct = true

-- Adicionar um novo usuário
INSERT INTO Users (name) VALUES ('Fulano')

-- Selecionar todos usuários
SELECT *
FROM Users

-- Pegar uma pergunta
-- Aleatória
SELECT *
FROM Questions
ORDER BY RANDOM()
LIMIT 1

-- Específica
SELECT *
FROM Questions AS q
WHERE q.id = 16

-- Pegar uma questão e todas suas alternativas
SELECT *
FROM Alternatives AS a
WHERE a.question_fk = 16

-- Verificar se uma alternativa marcada está correta
SELECT a.is_correct
FROM Alternatives AS a, Questions AS q
WHERE q.id = 16 AND q.id = a.question_fk AND a.id = 146

-- Responder uma pergunta
INSERT INTO Users_Questions (user_fk, question_fk, alternative_fk, is_correct) VALUES (1, 16, 146, true)

-- Verifica se o usuário já respondeu essa pergunta
SELECT
	EXISTS (
		SELECT
			*
		FROM
			USERS_QUESTIONS AS UQ,
			USERS AS U,
			QUESTIONS AS Q
		WHERE
			U.ID = 1
			AND Q.ID = 16
			AND UQ.USER_FK = U.ID
			AND UQ.QUESTION_FK = Q.ID
	) AS FOUNDED
	

-- Pegar quantidade de acertos de um usuário
SELECT
	COUNT(*)
FROM
	USERS_QUESTIONS AS UQ,
	USERS AS U
WHERE
	U.ID = 1
	AND UQ.USER_FK = U.ID
	AND UQ.IS_CORRECT= TRUE
