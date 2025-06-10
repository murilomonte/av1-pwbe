BEGIN;

DROP TABLE IF EXISTS public.Answers CASCADE;
DROP TABLE IF EXISTS public.Alternatives CASCADE;
DROP TABLE IF EXISTS public.Users CASCADE;
DROP TABLE IF EXISTS public.Questions CASCADE;

CREATE TABLE public.Questions (
    id INTEGER NOT NULL,
    description VARCHAR(500) NOT NULL,
    CONSTRAINT Questions_pkey PRIMARY KEY (id)
);

CREATE TABLE public.Alternatives (
    id INTEGER NOT NULL,
    description VARCHAR(200) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    question_fk INTEGER NOT NULL,
    CONSTRAINT Alternatives_pkey PRIMARY KEY (id),
    CONSTRAINT fk_questions_alternative FOREIGN KEY (question_fk)
        REFERENCES public.Questions (id)
);

CREATE TABLE public.Users (
    id SERIAL NOT NULL,
    name VARCHAR(150) NOT NULL,
    CONSTRAINT Users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.Answers (
    id SERIAL NOT NULL,
    user_fk INTEGER NOT NULL,
    question_fk INTEGER NOT NULL,
    alternative_fk INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
    CONSTRAINT Users_Questions_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users FOREIGN KEY (user_fk)
        REFERENCES public.Users (id),
    CONSTRAINT fk_questions FOREIGN KEY (question_fk)
        REFERENCES public.Questions (id),
    CONSTRAINT fk_alternatives FOREIGN KEY (alternative_fk)
        REFERENCES public.Alternatives (id)
);

-- Perguntas
INSERT INTO public.Questions (id, description) VALUES
(1, 'Qual é a capital do Brasil?'),
(2, 'Quantos continentes existem?'),
(3, 'Qual é o maior planeta do sistema solar?'),
(4, 'Quem escreveu “Dom Casmurro”?'),
(5, 'Em que ano o homem pisou na Lua pela primeira vez?'),
(6, 'Qual é a fórmula da água?'),
(7, 'Qual o menor número primo?'),
(8, 'Em que país se originou o futebol?'),
(9, 'Qual a cor da clorofila?'),
(10, 'Quem pintou a Mona Lisa?'),
(11, 'Qual é o símbolo químico do ouro?'),
(12, 'Qual a capital do Canadá?'),
(13, 'Quantos graus tem um ângulo reto?'),
(14, 'Qual o plural de “lápis”?'),
(15, 'Qual o maior oceano do mundo?'),
(16, 'Quem descobriu o Brasil?'),
(17, 'Quantos segundos tem uma hora?'),
(18, 'Qual a montanha mais alta do mundo?'),
(19, 'Qual é o idioma oficial da Austrália?'),
(20, 'Em que continente fica o Egito?');

-- Alternativas
INSERT INTO public.Alternatives (id, description, is_correct, question_fk) VALUES
-- Pergunta 1
(101, 'São Paulo', false, 1),
(102, 'Rio de Janeiro', false, 1),
(103, 'Brasília', true, 1),
-- Pergunta 2
(104, '5', false, 2),
(105, '6', false, 2),
(106, '7', true, 2),
-- Pergunta 3
(107, 'Terra', false, 3),
(108, 'Júpiter', true, 3),
(109, 'Saturno', false, 3),
-- Pergunta 4
(110, 'Machado de Assis', true, 4),
(111, 'José de Alencar', false, 4),
(112, 'Clarice Lispector', false, 4),
-- Pergunta 5
(113, '1969', true, 5),
(114, '1959', false, 5),
(115, '1975', false, 5),
-- Pergunta 6
(116, 'CO₂', false, 6),
(117, 'H₂O', true, 6),
(118, 'O₂', false, 6),
-- Pergunta 7
(119, '1', false, 7),
(120, '2', true, 7),
(121, '3', false, 7),
-- Pergunta 8
(122, 'Brasil', false, 8),
(123, 'Inglaterra', true, 8),
(124, 'Itália', false, 8),
-- Pergunta 9
(125, 'Verde', true, 9),
(126, 'Azul', false, 9),
(127, 'Amarelo', false, 9),
-- Pergunta 10
(128, 'Leonardo da Vinci', true, 10),
(129, 'Pablo Picasso', false, 10),
(130, 'Vincent van Gogh', false, 10),
-- Pergunta 11
(131, 'Ag', false, 11),
(132, 'Au', true, 11),
(133, 'Gd', false, 11),
-- Pergunta 12
(134, 'Toronto', false, 12),
(135, 'Vancouver', false, 12),
(136, 'Ottawa', true, 12),
-- Pergunta 13
(137, '90', true, 13),
(138, '45', false, 13),
(139, '180', false, 13),
-- Pergunta 14
(140, 'Lápises', false, 14),
(141, 'Lápis', true, 14),
(142, 'Lápisus', false, 14),
-- Pergunta 15
(143, 'Atlântico', false, 15),
(144, 'Pacífico', true, 15),
(145, 'Índico', false, 15),
-- Pergunta 16
(146, 'Pedro Álvares Cabral', true, 16),
(147, 'Cristóvão Colombo', false, 16),
(148, 'Américo Vespúcio', false, 16),
-- Pergunta 17
(149, '3600', true, 17),
(150, '600', false, 17),
(151, '360', false, 17),
-- Pergunta 18
(152, 'Everest', true, 18),
(153, 'Aconcágua', false, 18),
(154, 'K2', false, 18),
-- Pergunta 19
(155, 'Inglês', true, 19),
(156, 'Francês', false, 19),
(157, 'Alemão', false, 19),
-- Pergunta 20
(158, 'Ásia', false, 20),
(159, 'África', true, 20),
(160, 'Europa', false, 20);

COMMIT;