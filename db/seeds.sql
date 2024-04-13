INSERT INTO department (id, name)
VALUES (311, 'Sales'),
       (777, 'Personnel Administration'),
       (888, 'Inventory'),
       (999, 'Deliveries');

INSERT INTO role (id, title, salary, department_id)
VALUES (1234, 'Area Manager', 50000.00, 311),
       (5678, 'Store Manager' 40000.00, 777);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Clinton', 'Scheible', 1234, 555);
    