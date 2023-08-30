CREATE TABLE "products"(
    "product_id" BIGINT NOT NULL PRIMARY KEY,
);

CREATE TABLE "questions"(
    "question_id" BIGINT NOT NULL PRIMARY KEY,
    "question_body" TEXT NOT NULL,
    "question_date" DATE NOT NULL,
    "asker_name" VARCHAR(255) NOT NULL,
    "question_helpfulness" BIGINT,
    "reported" BOOLEAN NOT NULL,
    "product_id" FOREIGN KEY
);

CREATE TABLE "answers"(
    "id" BIGINT NOT NULL PRIMARY KEY,
    "body" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "answerer_name" VARCHAR(255) NOT NULL,
    "helpfulness" BIGINT NOT NULL,
    "photos" TEXT [],
    "question_id" FOREIGN KEY
);