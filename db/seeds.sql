USE employeesDB;

INSERT INTO department (name)
VALUES 
("Product Management"),
("Engineering"),
("Quality Assurance"),
("Project Management"),
("Supply"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Product Manager", 140000, 1),
("Supply Manager", 115000, 5),
("Director, R&D", 250000, 2),
("Lead Engineer", 150000, 2),
("Software Engineer", 130000, 2),
("Quality Manager", 140000, 3),
("Project Manager", 110000, 4),
("Legal Attorney", 210000, 6);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Robert", "Tecson", 2, null),
("John", "Redford", 4, 3),
("Peter", "Park", 3, null),
("Brenda", "Munoz", 5, null),
("Maria", "Hurst", 6, 2),
("Gary", "Smith", 3, null),
("Kimberly", "Hayes", 4, 6),
("Matt", "Hardy", 1, 1);
("William", "Chapman", 5, null),
("Shad", "Zemler", 6, 2),
("Bryan", "Smith", 3, null),
("Julia", "Roberts", 4, 6),
("Laura", "Stroike", 1, 1);