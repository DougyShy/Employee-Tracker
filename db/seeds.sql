INSERT INTO department (id, name)
VALUES (31134, 'Sales'),
       (75698, 'Personnel Administration'),
       (58624, 'Inventory');

INSERT INTO role (id, title, salary, department_id)
VALUES (12345, 'Area Manager', 75000.00, 31134),
       (56789, 'Store Manager', 40000.00, 75698);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (42695, 'Clinton', 'Scheible', 12345, 37615),
       (78294, 'Billy', 'Hossness', 56789, 13699);