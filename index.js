const inquirer = require('inquirer');
const fs = require('fs');

inquirer
    .prompt([
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
                break;
            case 'View all roles':
                console.log(answers.menu_choice);
                break;  
            case 'View all employees':
                console.log(answers.menu_choice);
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