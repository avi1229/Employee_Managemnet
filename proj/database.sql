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

INSERT INTO employees VALUES (123,'Sruthi','hr','Female','Single', 50000.00,'Vijayawada');
INSERT INTO employees VALUES (124,'Swetha','it','Female','Married', 70000.00,'Hyderabad');
INSERT INTO employees VALUES (125,'Damodhar','finance','Male','Married', 60000.00,'Hyderabad');


