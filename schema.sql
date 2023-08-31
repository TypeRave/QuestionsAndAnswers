CREATE TABLE "questions"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "product_id" BIGINT NOT NULL,
    "body" VARCHAR(1000) NOT NULL,
    "date_written" DATE NOT NULL,
    "asker_name" VARCHAR(60) NOT NULL,
    "asker_email" VARCHAR(60) NOT NULL,
    "reported" BOOLEAN NOT NULL DEFAULT false,
    "helpful" BIGINT BIGINT NOT NULL DEFAULT 0,
);

CREATE TABLE "answers"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "question_id" BIGINT REFERENCES questions(id) FOREIGN KEY,
    "body" VARCHAR(1000) NOT NULL,
    "date_written" DATE NOT NULL,
    "answerer_name" VARCHAR(60) NOT NULL,
    "answerer_email" VARCHAR(60) NOT NULL,
    "reported" BOOLEAN DEFAULT false,
    "helpful" BIGINT NOT NULL DEFAULT 0,
);

CREATE TABLE "answer_photos"(
    "id" BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
    "answer_id" BIGINT REFERENCES answers(id) FOREIGN KEY,
    "url" TEXT NOT NULL,
);