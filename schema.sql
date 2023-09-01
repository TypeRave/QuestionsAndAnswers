-- run this command in postgres shell
-- \i /Users/brandongomez/Desktop/QuestionsAndAnswers/schema.sql

CREATE DATABASE questionsandanswers;

\c questionsandanswers

CREATE TABLE "questions"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "product_id" BIGINT NOT NULL,
    "body" VARCHAR(1000) NOT NULL,
    "date_written" BIGINT NOT NULL,
    "asker_name" VARCHAR(60) NOT NULL,
    "asker_email" VARCHAR(60) NOT NULL,
    "reported" BOOLEAN NOT NULL DEFAULT false,
    "helpful" BIGINT  NOT NULL DEFAULT 0
);

CREATE TABLE "answers"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "question_id" BIGINT REFERENCES questions(id),
    "body" VARCHAR(1000) NOT NULL,
    "date_written" BIGINT NOT NULL,
    "answerer_name" VARCHAR(60) NOT NULL,
    "answerer_email" VARCHAR(60) NOT NULL,
    "reported" BOOLEAN DEFAULT false,
    "helpful" BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE "answers_photos"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "answer_id" BIGINT REFERENCES answers(id),
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