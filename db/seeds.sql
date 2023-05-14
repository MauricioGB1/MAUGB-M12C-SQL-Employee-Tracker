USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Development");
INSERT INTO department (name)
VALUES ("Quality");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Testing");
INSERT INTO department (name)
VALUES ("Product Care")
INSERT INTO department (name)
VALUES ("Supply")
INSERT INTO department (name)
VALUES ("Project Management")

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Account Manager", 114000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Attorney", 198500, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 135000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Development Engineer", 140000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Quality Manager", 150000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Product Manager", 120000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ("Testing Engineer", 95000, 7);
INSERT INTO role (title, salary, department_id)
VALUES ("Product Care Engineer", 83500, 8);
INSERT INTO role (title, salary, department_id)
VALUES ("Supply Manger", 98000, 9);
INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 130600, 10);


INSERT INTO employee (first_name, last_name, manager_id)
VALES ("Robert", "Smith", 1, 3);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("Sheila", "Clark", 2, 4);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("Matthew", "Carson", 3, 3);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("John", "Zemler", 4, null);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("Tracey", "Chon", 5, 1);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("Brenda", "Smith", 6, 3);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("George", "Smith", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("Julia", "Roberts", 7, null);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("Carmen", "Miranda", 9, 2);
INSERT INTO employee (first_name, last_name, manager_id)
VALES ("Ryan", "Palmer", 8, 5);