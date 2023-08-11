-- CREATE DATABASE employee_salary_management;

USE employee_salary_management;

CREATE TABLE employees (
    s_no int NOT NULL AUTO_INCREMENT,
    e_id INT,
    e_name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    e_gender VARCHAR(255) NOT NULL,
    e_maritalstatus VARCHAR(255) NOT NULL,
    e_salary DECIMAL(10, 2) NOT NULL,
    e_address VARCHAR(255) NOT NULL
);

INSERT INTO employees VALUES (123,'John Doe','HR','MALE','UNMARRIED', 50000.00,'GUDIVADA');
INSERT INTO employees VALUES (124,'Johe','HR','FEMALE','UNMARRIED', 60000.00,'VIJAYAWADA');

