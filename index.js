const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ms47I60Iq@3M",
    database: "employee_db"
  });
  
  connection.connect(err => {
    if (err) {
      throw err;
    }
    
    console.log(`Connection successful! Connected to thread: ${connection.threadId}`)
    inquirer.prompt(
        {
            type: "list",
            name: "action",
            message: "What action would you like to perform?",
            choices: ['View Employee', 'View Department', 'View Role', 'Add Employee', 'Add Department', 'Add Role', 'Update Role']
        }
    ).then(function(answer) {
        switch (answer.action) {
            case 'View Employee':
            viewEmployee();
            break;

            case 'View Department':
            viewDepartment();
            break;

            case 'View Role':
            viewRole();
            break;

            case 'Add Employee':
            addEmployee();
            break;

            case 'Add Department':
            addDepartment();
            break;

            case 'Add Role':
            addRole();
            break;

            case 'Update Role':
            updateRole();
            break;

        }
    });

  });

  const addEmployee = () => {
    console.log(answer.action);
    
  }

  const addDepartment = () => {
    console.log(answer.action);
  }

  const addRole = () => {
    console.log(answer.action);
  }

  const viewEmployee = () => {
    console.log(answer.action);
  }

  const viewDepartment = () => {
    console.log(answer.action);
  }

  const viewRole = () => {
    console.log(answer.action);
  }

  const updateRole = () => {
    console.log(answer.action);
  }