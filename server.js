const connection = require('./config/connection');
const inquirer = require("inquirer");
require("console.table");


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log(` 
  ***********************************************************************
  **************                                *************************
  **************       EMPLOYEE   MANAGER       *************************
  **************                                *************************
  ***********************************************************************
  ***********************************************************************`)

  firstPrompt();
});


function firstPrompt() {
  
  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Please Select the opcion from the menu",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Update Employee Role",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Remove Employee",
        "Remove Department",
        "Remove Role",
        "End"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View All Employees":
          viewEmployee();
          break;

        case "View All Departments":
          viewDepartment();
          break;

        case "View All Roles":
          viewRole();
          break;
        
        case "Update Employee Role":
          updateEmployeeRole();
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

        case "Remove Employee":
          removeEmployee();
          break;

        case "Remove Department":
          removeDepartment();
          break;
  
        case "Remove Role":
          removeRole();
          break;
        
        case "End":
          connection.end();
          break;
      }
    });
}


function viewEmployee() {

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employees e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employees m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    firstPrompt();
  });

}


function viewDepartment() {

  var query =
    `SELECT d.id, d.name
  FROM department d`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    firstPrompt();
  });
}


function viewRole() { 

  var query =
    `SELECT r.id, r.title, r.salary, d.name AS department
  FROM role r
  LEFT JOIN department d
  ON d.id = r.department_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    firstPrompt();

  });
}


function updateEmployeeRole(){

  var query =
  `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employees e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employees m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);
    
    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {

  var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which EMPLOYEE do you want to SET with the ROLE?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which ROLE do you want to UPDATE?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employees SET role_id = ? WHERE id = ?`

      connection.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated Successfully!");

          firstPrompt();
        });
    });
}



function addEmployee() {
  
  var query =
  `SELECT r.id, r.title, r.salary 
  FROM role r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));


    console.table(res);

    promptInsert(roleChoices);
  });
}


function promptInsert(roleChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the Employee's First Name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the Employee's Last Name?"
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the Employee's Role?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employees SET ?`
   
      connection.query(query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          firstPrompt();
        });
    });
}


function addDepartment(depChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "dep_name",
        message: "What is the department name?",
        choices: depChoices
      },
     
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO department SET ?`
      connection.query(query,
        {
          name: answer.dep_name,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          firstPrompt();
        });
    });
}


function addRole() {

  var query =
    `SELECT d.id, d.name, r.salary AS budget
    FROM employees e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(({ id, name }) => ({
      value: id, name: `${id} ${name}`
    }));

    console.table(res);

    promptAddRole(departmentChoices);
  });
}

function promptAddRole(departmentChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Role title?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Role Salary"
      },
      {
        type: "list",
        name: "departmentId",
        message: "Department?",
        choices: departmentChoices
      },
    ])
    .then(function (answer) {

      var query = `INSERT INTO role SET ?`

      connection.query(query, {
        title: answer.roleTitle,
        salary: answer.roleSalary,
        department_id: answer.departmentId
      },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Role Inserted!");

          firstPrompt();
        });

    });
}


function removeEmployee() {

  var query =
    `SELECT e.id, e.first_name, e.last_name
      FROM employees e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);

    promptDelete(deleteEmployeeChoices);
  });
}

function promptDelete(deleteEmployeeChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Select EMPLOYEE that you would like to REMOVE?",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM employees WHERE ?`;

      connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        firstPrompt();
      });
    });
}



function removeDepartment() {

  var query =
    `SELECT d.id, d.name
      FROM department d`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteDepChoices = res.map(({ id, name }) => ({
      value: id, name: `${id} ${name}`
    }));


    console.table(res);

    promptDeleteDep(deleteDepChoices);
  });
}

function promptDeleteDep(deleteDepChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "depName",
        message: "Please select the DEPARTMENT that you would like to REMOVE?",
        choices: deleteDepChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM department WHERE ?`;

      connection.query(query, { id: answer.depName }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        firstPrompt();
      });
    });
}


function removeRole() {

  var query =
  `SELECT r.id, r.title, r.salary, d.name AS department
  FROM role r
  LEFT JOIN department d
  ON d.id = r.department_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteRoleChoices = res.map(({ id, title}) => ({
      value: id, name: `${id} ${title}`
    }));

    console.table(res);

    promptDeleteRole(deleteRoleChoices);
  });
}

function promptDeleteRole(deleteRoleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "roleId",
        message: "Please select the ROLE that you would like to REMOVE?",
        choices: deleteRoleChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM role WHERE ?`;

      connection.query(query, { id: answer.roleId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        firstPrompt();
      });
    });
}