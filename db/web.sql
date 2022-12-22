-- first install PostgreSQL!!!

CREATE DATABASE web_8;

create TABLE teachers
(
    teacher_id      SERIAL PRIMARY KEY,
    name    VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    email   VARCHAR(50) NOT NULL UNIQUE,
    phone   VARCHAR(50) NOT NULL
);

create TABLE faculty
(
    faculty_id         SERIAL PRIMARY KEY,
    name       VARCHAR(128) NOT NULL,
    short_name VARCHAR(30) NOT NULL
);

create TABLE departments
(
    department_id         SERIAL PRIMARY KEY,
    faculty_id INTEGER NOT NULL,
    name       VARCHAR(128) NOT NULL,
    short_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (faculty_id) REFERENCES faculty (faculty_id)
);

create TABLE groups
(
    group_id            SERIAL PRIMARY KEY,
    department_id INTEGER NOT NULL,
    name          VARCHAR(30) NOT NULL,
    course        VARCHAR(128) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (department_id)
);

create TABLE students
(
    student_id       SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL,
    name     VARCHAR(128) NOT NULL,
    email    VARCHAR(50) NOT NULL,
    phone    INTEGER NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups (group_id)
);

create TABLE disciplines
(
    discipline_id  SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

create TABLE schedule
(
    schedule_id SERIAL PRIMARY KEY,
    name          VARCHAR(64) NOT NULL,
    teacher_id    INTEGER NOT NULL,
    discipline_id INTEGER NOT NULL,
    group_id      INTEGER NOT NULL,
    time          TIME NOT NULL,
    classroom     VARCHAR(64) NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers (teacher_id),
    FOREIGN KEY (discipline_id) REFERENCES disciplines (discipline_id),
    FOREIGN KEY (group_id) REFERENCES groups (group_id)
);

create TABLE faq
(
    faq_id  SERIAL PRIMARY KEY,
    faq_order INTEGER NOT NULL,
    content TEXT NOT NULL
);
