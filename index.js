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

  console.log(
    `Connection successful! Connected to thread: ${connection.threadId}`
  );
  start();
});

const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What action would you like to perform?",
      choices: [
        "View Employee",
        "View Department",
        "View Role",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Role",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Employee":
          viewEmployee();
          break;

        case "View Department":
          viewDepartment();
          break;

        case "View Role":
          viewRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Role":
          updateRole();
          break;

        case "Exit":
          exit();
          break;
      }
    });
};

const addEmployee = () => {
  connection.query(
    'select role.title from role',
    (err, results) => {
      if (err) {
        throw err;
      }
      const roles = results.map(e => e.title);
      connection.query(
        'select department.name from department',
        (err, results) => {
          if (err) {
            throw err;
          }
          const departments = results.map(e => e);

          inquirer.prompt([
            {
              message: "What is their first name?",
              type: "input",
              name: "firstName"
            },
            {
              message: "What is their last name",
              type: "input",
              name: "lastName"
            },
            {
              message: "What role does this employee have?",
              type: "list",
              name: "newRole",
              choices: roles
            },
            {
              message: "What department is the employee in?",
              type: "list",
              name: "newDept",
              choices: departments
            }
          ]).then(function (answer) {
            const empDept = answer.newDept;
            const empFirst = answer.firstName;
            const empLast = answer.lastName;
            connection.query(
              `select role.id from role where role.title = '${answer.newRole}'`,
              (err, results) => {
                if (err) {
                  throw err;
                }
                const roleId = results[0].id;
                connection.query(
                  `select * from employee where role_id = 1`,
                  (err, results) => {
                    if (err) {
                      throw err;
                    }
                    for (let i = 0; i < results.length; i++) {
                      if (results[i].department === empDept) {
                        const managerId = results[i].id;
                        connection.query(
                          `insert into employee (first_name, last_name, role_id, manager_id, department)
                          values ('${empFirst}', '${empLast}', ${roleId}, ${managerId}, '${empDept}')`,
                          (err) => {
                            if (err) {
                              throw err;
                            }
                            console.log('Employee added!');
                            start();
                          });
                      };
                    };
                  });
              });
          });
        });
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      message: "What is the Department's name?",
      name: "name",
      type: "input"
    })
    .then(function (answer) {
      const dept = answer.name;
      connection.query(
        `insert into department (name)
          values ('${dept}')`,
        err => {
          if (err) {
            throw err;
          }
          console.log("Department added!");
          start();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        message: "What is the Role's name?",
        name: "name",
        type: "input"
      },
      {
        message: "What is this position's salary?",
        name: "salary",
        type: "list",
        choices: [30000, 40000, 60000, 100000, 150000]
      }
    ])
    .then(function (answer) {
      const title = answer.name;
      const salary = answer.salary;
      connection.query(
        `insert into role (title, salary)
          values ('${title}', ${salary})`,
        err => {
          if (err) {
            throw err;
          }

          console.log("Role added!");
          start();
        }
      );
    });
};

const viewEmployee = () => {
  console.log(answer.action);
};

const viewDepartment = () => {
  connection.query("select * from department", (err, results) => {
    if (err) {
      throw err;
    }
    const deptList = results.map(e => e.name);
    inquirer
      .prompt({
        message: "Which department would you like to view?",
        name: "deptSelect",
        type: "list",
        choices: deptList
      })
      .then(function (answer) {
        connection.query(
          `select * from employee where department = '${answer.deptSelect}'`,
          (err, results) => {
            if (err) {
              throw err;
            }
            console.table(results)
            start();
          }
        );
      });
  });
};

const viewRole = () => {
  connection.query("select * from role", (err, results) => {
    if (err) {
      throw err;
    }
    const roleList = results.map(e => e.title);
    inquirer
      .prompt({
        message: "Which role would you like to view?",
        name: "roleSelect",
        type: "list",
        choices: roleList
      })
      .then(function (answer) {
        connection.query(
          `select employee.first_name, employee.last_name, role.title, employee.department
          from employee
          left join role on employee.role_id=role.id  where role.title = "${answer.roleSelect}"`,
          (err, results) => {
            if (err) {
              throw err;
            }
            console.table(results)
            start();
          }
        );
      });
  });
};

const updateRole = () => {
  connection.query(
    'select * from department',
    (err, results) => {
      if (err) {
        throw err;
      }
      let depts = results.map(e => e.name)
      inquirer.prompt({
        message: "Which department does the Employee work?",
        type: "list",
        name: "dept",
        choices: depts
      }).then(function(answer) {
        connection.query(
          `select * from employee where department = '${answer.dept}'`,
          (err, results) => {
            if(err) throw err;
            const empSelect = results.map(e => e.first_name)
            inquirer.prompt({
              message: "Which employee would you like to promote/demote?",
              type: "list",
              name: "employee",
              choices: empSelect
            }).then(function(answer) {
              const emp = answer.employee
              connection.query(
                'select * from role',
                (err, results) => {
                  if(err) throw err;
                  const roles = results.map(e => e.title)
                  inquirer.prompt({
                    message: "What role will they have?",
                    type: "list",
                    name: "roleChange",
                    choices: roles
                  }).then(function(answer) {
                    for (let i = 0; i < results.length; i++) {
                    if (answer.roleChange === results[i].title)
                    connection.query(
                      `update employee 
                      set role_id = ${results[i].id}
                      where first_name = '${emp}'`,
                      (err) => {
                        if(err) throw err;
                        console.log('role updated!')
                        start();
                      }
                    )
                    }
                  })
                }
              )
            })
          }
        )
      })
    }
  )
};

const exit = () => {
  console.log('Goodbye!')
  connection.end();
}