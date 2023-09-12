-- run this command in postgres shell
-- \i /Users/brandongomez/Desktop/QuestionsAndAnswers/schema.sql

CREATE DATABASE questionsandanswers;

\c questionsandanswers

CREATE TABLE "questions"(
    "id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "product_id" INTEGER NOT NULL,
    "body" VARCHAR(1000) NOT NULL,
    "date_written" BIGINT NOT NULL,
    "asker_name" VARCHAR(60) NOT NULL,
    "asker_email" VARCHAR(60) NOT NULL,
    "reported" BOOLEAN NOT NULL DEFAULT false,
    "helpful" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "answers"(
    "id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "question_id" SERIAL REFERENCES questions(id),
    "body" VARCHAR(1000) NOT NULL,
    "date_written" BIGINT NOT NULL,
    "answerer_name" VARCHAR(60) NOT NULL,
    "answerer_email" VARCHAR(60) NOT NULL,
    "reported" BOOLEAN DEFAULT false,
    "helpful" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "answers_photos"(
    "id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
    "answer_id" SERIAL,
    "url" TEXT NOT NULL
);

COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/brandongomez/Desktop/SDC/data/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
FROM '/Users/brandongomez/Desktop/SDC/data/answers.csv'
DELIMITER ','
CSV HEADER;

COPY answers_photos(id,answer_id,url)
FROM '/Users/brandongomez/Desktop/SDC/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'id'), (SELECT MAX(id) FROM answers)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('answers_photos', 'id'), (SELECT MAX(id) FROM answers_photos)+1);

CREATE INDEX product_index ON questions (product_id);
CREATE INDEX question_index ON answers (question_id);
CREATE INDEX answer_index ON answers_photos (answer_id);

ALTER TABLE questions RENAME COLUMN id TO question_id;
ALTER TABLE questions RENAME COLUMN body TO question_body;
ALTER TABLE questions RENAME COLUMN date_written TO question_date;
ALTER TABLE questions RENAME COLUMN helpful TO question_helpfulness;

ALTER TABLE answers RENAME COLUMN id TO answer_id;
ALTER TABLE answers RENAME COLUMN date_written TO date;
ALTER TABLE answers RENAME COLUMN helpful TO helpfulness;