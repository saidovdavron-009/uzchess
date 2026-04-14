CREATE DATABASE dars306;

DROP TABLE groups;

CREATE TABLE groups
(
    id    SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL
);


ALTER TABLE groups
    ALTER COLUMN title DROP NOT NULL;

ALTER TABLE groups
    ALTER COLUMN title SET NOT NULL;

ALTER TABLE groups
    RENAME title TO name;

ALTER TABLE groups
    ADD COLUMN createdDate TIMESTAMP NOT NULL DEFAULT now();

ALTER TABLE groups
    ALTER COLUMN createdDate TYPE TIMESTAMP;

INSERT INTO groups (name)
VALUES ('Bootcamp Full-Stack N28'),
       ('WebPracticum n5'),
       ('Foundation');

SET timezone = 'UTC';
SELECT id, name, groups.createddate
from groups;

ALTER TABLE groups
    ALTER COLUMN createddate SET DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE students
(
    id       SERIAL PRIMARY KEY,
    fullName VARCHAR(30) NOT NULL,
    gender   VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female'))
);

INSERT INTO students(fullName, gender)
VALUES ('Davron', 'male'),
       ('Asilbek', 'male'),
       ('Sherozbek', 'male'),
       ('Behruz', 'male'),
       ('Muslima', 'female'),
       ('Bilol', 'male');


ALTER TABLE students
    ADD COLUMN groupId INT NULL;

ALTER TABLE students
    ADD CONSTRAINT "students_to_group_fk" FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE SET NULL;

SELECT students.id, fullName, groups.name as "group"
from students
         INNER JOIN groups ON groups.id = students.groupId
ORDER BY id;

SELECT students.id, fullName, groups.name as "group"
from students
         LEFT JOIN groups ON groups.id = students.groupId
ORDER BY id;

SELECT students.id, fullName, groups.name as "group"
from students
         RIGHT JOIN groups ON groups.id = students.groupId
ORDER BY id;

SELECT students.id, fullName, groups.name as "group"
from students
         FULL JOIN groups ON groups.id = students.groupId
ORDER BY id;

CREATE TABLE teachers
(
    id       SERIAL PRIMARY KEY,
    fullName VARCHAR(61) NOT NULL,
    gender   VARCHAR(64) NOT NULL CHECK (gender IN ('male', 'female'))
);

INSERT INTO teachers(fullName, gender)
VALUES ('SolihBilol', 'male'),
       ('Jahongir', 'male');

ALTER TABLE groups
    ADD COLUMN teacherId INT NULL REFERENCES teachers (id) DEFAULT 1;

SELECT s.id, s.fullname as student, g.name as group, t.fullName as teacher
from students s
         LEFT JOIN groups g ON g.id = s.groupId
         LEFT JOIN teachers t ON g.teacherId = t.id
ORDER BY s.fullname;


CREATE TABLE author
(
    id        SERIAL PRIMARY KEY,
    fullName  VARCHAR(64) NOT NULL,
    birthDate DATE        NOT NULL,
    gender    VARCHAR(15) NOT NULL CHECK (gender IN ('male', 'female'))
);

ALTER TABLE author
    DROP CONSTRAINT author_gender_check;

ALTER TABLE author
    ADD CONSTRAINT author_gender_check CHECK ( gender IN ('male', 'female') );

ALTER TABLE author
    ADD CONSTRAINT unique_author_fullname UNIQUE (fullname);

ALTER TABLE author
    ADD COLUMN phoneNumber VARCHAR(16) NOT NULL CHECK ( length(phoneNumber) >= 9 ) DEFAULT '+998931389910';

INSERT INTO author (fullName, birthDate, gender)
VALUES ('Alisher Navoiy', '1441-02-09', 'male'),
       ('Halima Xudoyberdiyeva', '1947-05-17', 'female'),
       ('Cho''lpon (Abdulhamid Sulaymon)', '1897-12-01', 'male'),
       ('Anbar Otin', '1870-01-01', 'female'),
       ('Pirimqul Qodirov', '1928-10-25', 'male');

CREATE TABLE books
(
    id      SERIAL PRIMARY KEY,
    title   VARCHAR(255)   NOT NULL,
    pages   INTEGER        NOT NULL,
    pubdate DATE           NOT NULL,
    price   DECIMAL(12, 2) NOT NULL
);

INSERT INTO books (title, pages, pubdate, price)
VALUES
    ('Kecha va kunduz', 420, '1936-01-01', 65000.50),
    ('Avlodlar dovoni', 520, '1989-05-15', 88000.00),
    ('Muqaddas', 180, '1960-10-20', 35000.00),
    ('Saodat asri qissalari', 900, '2005-12-01', 250000.00),
    ('Sizga qanday yordam bera olaman?', 150, '2020-03-12', 45000.75);

ALTER TABLE author
    ADD COLUMN bookId INT NULL;

ALTER TABLE author
    ADD CONSTRAINT "author_to_group_fk" FOREIGN KEY (bookId) REFERENCES books (id) ON DELETE SET NULL;



