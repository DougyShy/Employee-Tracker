const { prompt } = require('inquirer');
const { Pool } = require('pg');
const uuid = require('./helpers/uuid');

var departmentList = [];
var roleList = [];
quitProgram = false;

// Connect to database
const pool = new Pool ({
    host: "localhost",
    user: "postgres",
    password: "fossil69",
    database: "business_db",
    port: process.env.PORT || 5432
});

pool.connect();

async function loadDepartmentList() {
    departmentList = [];
    const client = await pool.connect();
    try {
        let result = await client.query(`SELECT * FROM department`);
        let departments = result.rows;
        departments.forEach((element) => departmentList.push(JSON.parse(JSON.stringify(element))));
    } finally {
        client.release(departmentList);
    }
};

async function loadRoleList() {
    roleList = [];
    const client = await pool.connect();
    try {
        let result = await client.query(`SELECT id, title AS name FROM role`);
        let roles = result.rows;
        roles.forEach((element) => roleList.push(JSON.parse(JSON.stringify(element))));
    } finally {
        client.release();
    }
};

const getDeptId = function (deptName) {
    let deptId;
    departmentList.forEach((element) => {(element.name == deptName) ? deptId = element.id : false});
    return deptId;
}

const getRoleId = function (roleTitle) {
    let roleId;
    roleList.forEach((element) => {(element.name == roleTitle) ? roleId = element.id : false});
    return roleId;
}

function exit () {
    ui.close();
}

async function trackEmployees() {
        await loadDepartmentList();
        await loadRoleList();

        getRoleId('Area Manager');
        //console.log(roleList.title);

        return prompt([
            {
                type: 'list',
                name: 'menu_choice',
                message: 'How would you like to manage the company database today?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'],  
            },          
        ])
        .then(answers => {
            switch(answers.menu_choice) {
                case 'View all departments':
                    console.log(answers.menu_choice);
                    pool.query('SELECT * FROM department', (err, res) => {
                        console.table(res.rows);
                        trackEmployees();
                    })
                    break;            
                case 'View all roles':
                    console.log(answers.menu_choice);
                    pool.query('SELECT * FROM role', (err, res) => {
                        console.table(res.rows);
                        trackEmployees();
                    })
                    break;  
                case 'View all employees':
                    console.log(answers.menu_choice);
                    pool.query('SELECT * FROM employee', (err, res) => {
                        console.table(res.rows);
                        trackEmployees();
                    })
                    break;
                case 'Add a department':
                    console.log(answers.menu_choice);
                    prompt([
                        {
                            type: 'input',
                            name: 'newDeptName',
                            message: 'What is the name of the new department?'
                        }
                    ])
                    .then(answers => {
                        console.log(answers.newDeptName);
                        pool.query("INSERT INTO department (id, name) VALUES (" + uuid() + ", '" + answers.newDeptName + "')", (err, res) => {
                            console.log('New Department added: ' + answers.newDeptName);     
                            trackEmployees();
                        });
                     });
                    break;
                case 'Add a role':
                    console.log(answers.menu_choice);
                    prompt([
                        {
                            type: 'input',
                            name: 'roleTitle',
                            message: 'What is the title of this new role?'     
                        },
                        {
                            type: 'input',
                            name: 'roleSalary',
                            message: 'What is the salary for this role?' 
                        },
                        {
                            type: 'list',
                            name: 'departmentName',
                            message: "What department would you like to add this role to?",
                            choices: departmentList,
                        }
                    ])
                    .then(answers => {
                        // get foreign key with department name
                        let dept_id = getDeptId(answers.departmentName);

                        pool.query(("INSERT INTO role (id, title, salary, department_id) VALUES (" + uuid() + ", '" + answers.roleTitle + "', " + answers.roleSalary + ", " + dept_id + ")"), (err, res) => {
                            console.log('New role added to ' + answers.departmentName + ": " + answers.roleTitle);
                            if (err) {
                                console.log(err);
                            };
                            trackEmployees();
                        });
                    })
                    break;  
                case 'Add an employee':
                    console.log(answers.menu_choice);
                    prompt([
                        {
                            type: 'input',
                            name: 'employeeFirstName',
                            message: 'What is the first name of the new employee?'     
                        },
                        {
                            type: 'input',
                            name: 'employeeLastName',
                            message: 'What is the last name of the new employee?' 
                        },
                        {
                            type: 'list',
                            name: 'roleName',
                            message: "What role will be assigned to this new employee?",
                            choices: roleList,
                        }
                    ])
                    .then(answers => {
                        // get foreign key with role name
                        let role_id = getRoleId(answers.roleName);

                        pool.query(("INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (" + uuid() + ", '" + answers.employeeFirstName + "', '" + answers.employeeLastName + "', " + role_id + ", " + uuid() + ")"), (err, res) => {
                            console.log('New employee added with role: ' + answers.roleName + ": " + answers.employeeFirstName + " " + answers.employeeLastName)
                            if (err) {
                                console.log(err);
                            };
                            trackEmployees();
                        });
                    });
                    break;
                case 'Update an employee role':
                    console.log(answers.menu_choice);
                    break;
                case 'Quit':
                    console.log("Quitting...");
                    // Want to simple exit program/app here
                    process.exit();
                default:
                    console.log("Error may have occurred");
                    break;  
            }
        });
};

trackEmployees();