const { prompt } = require('inquirer');
const { Pool } = require('pg');

// Connect to database
const pool = new Pool ({
    host: "localhost",
    user: "postgres",
    password: "fossil69",
    database: "business_db",
    port: process.env.PORT || 5432
});

pool.connect();

prompt([
        {
            type: 'list',
            name: 'menu_choice',
            message: 'How would you like to manage the company database today?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],  
        },          
    ])
    .then(answers => {
        switch(answers.menu_choice) {
            case 'View all departments':
                console.log(answers.menu_choice);
                pool.query('select * from department', (err, res) => {
                    console.table(res.rows);
                })
                break;             
            case 'View all roles':
                console.log(answers.menu_choice);
                pool.query('select * from role', (err, res) => {
                    console.table(res.rows);
                })
                break;  
            case 'View all employees':
                console.log(answers.menu_choice);
                pool.query('select * from employee', (err, res) => {
                    console.table(res.rows);
                })
                break;
            case 'Add a department':
                console.log(answers.menu_choice);
                break;
            case 'Add a role':
                console.log(answers.menu_choice);
                break;  
            case 'Add an employee':
                console.log(answers.menu_choice);
                break;
            case 'Update an employee role':
                console.log(answers.menu_choice);
                break;
            default:
                console.log("Error may have occurred");
                break;  
        }
    });