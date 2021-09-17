USE companyinfo_db;

INSERT INTO department (name) 
VALUES ("Accounting"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000.00, 1),
        ("Salesperson",50000.00,2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe","Johnson",1, NULL),
       ("Patricia","Smith",1,1),
       ("Sally","Williams",2, NULL);
