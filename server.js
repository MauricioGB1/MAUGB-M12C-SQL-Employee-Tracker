const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");


const connection = mysql.createConnection(
{
    host: 'localhost',

    PORT: 3001,
    
    user: 'root',
    password: 'password',
    database: 'employeesDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(` *******  EMPLOYEE MANAGER  ******`)
    firstPrompt();
});


function firstPrompt() {

    inquirer
    .prompt({
        type: "list",
        name: "task",
        message: "Please select the option how you would like to proceed",
        choice: [
                "View Employees",
                "View Employees by Department",
                "Add Employees",
                "Remove Employees",
                "Update Employee Role",
                "Add Role",
                "End"
                ]

    })

.then(function ({ task }) {
    switch (task) {
        case "View Employees":
        viewEmployee();
        break;
     
       case "View Employees by Department":
       viewEmployeeByDepartment();
       break;

       case "Add Employee":
       addEmployee();
       break;

       case "Remove Employees":
       removeEmployees();
       break;
       
       case "Update Employee Role":
       updateEmployeeRole();
       break;
       
       case "Add Role":
       addRole();
       break; 
       
       case "End":
        connection.end();
        break;
        }
    });
}

function viewEmployee() {
    console.log("Viewing employees\n");

    var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Employees viewed!\n");

        firstPrompt();
      });
}

///////////  1-Section  1-to Review   2 - to Test ///

function viewEmployeeByDepartment() {
    console.log("Viewing employees by department\n");

    var query =
    `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

    connection.query(query, function (err, res) {
         if (err) throw err;

    const departmentChoices = res.map(data => ({
        value: data.id, name: data.name
    }));

    console.table(res);
    console.log("Department view suceed!\n");

    promptDepartment(departmentChoices);
    });
}

////////   1= Section  function = 4   0  Choice/////


function promptDepartment(departmentChoices) {

inquirer

    .prompt([
    {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to choose?",
        choices: departmentChoices
    }
])
.then(function (answer) {
    console.log("answer", answer.departmentId);

    var query =
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
        FROM employee e
        JOIN role r
        ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id
        WHERE d.id = ?`

    connection.query(query, answer.departmentId, function (err, res) {
        if (err) throw err;

        console.table("response ", res);
        console.log(res.affectedRows + "Employees are viewed")

        firstPrompt();
        });
    });
}

////   1 - section     variables -7  constant -  6   /////


function addEmployee() {
    console.log("Adding an employee!")

var query =
`SELECT r.id, r.title, r.salary
FROM role r`

connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}` , salary: `${salary}`
    }));

    console.table(res);
    console.log("RleToInsert!");

    promptInsert(roleChoices);
  });
}


/////  1- Section       Function - 9      8  consecutive  /////

function promptInsert(roleChoices) {

inquirer

.prompt([
    {
        type: "input",
        name: "first_name",
        message: "What is yhe employee's First Name?"
    },
    {
        type: "input",
        name: "last_name",
        message: "What is yhe employee's Last Name?"
    },
    {
        type: "list",
        name: "roleId",
        message: "What is yhe employee's Role?"
    },
 ])

.then(function (answer) {
    console.log(answer);

    var query = `INSERT INTO employee SET ?`
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
            console.log(res.insertedRows + "Inserted Sucessfully!\n");

            firstPrompt();
        });
    });
}

/////  2- Section       Function - 4      1  consecutive  /////

function removeEmployees() {

    console.log("Deleting an employee");

    var query = 
    `SELECT e.id, e.first_name, e.last_name
    FROM employee e`

    connection.query(query, function (err, res) {
    if (err)  throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));

      console.table(res);
      console.log("ArraytoDelete!\n");

      promptDelete(deleteEmployeeChoices);
    });
}

function promptDelete(deleteEmployeeChoices) {

    inquirer.prompt([
        {
         type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: deleteEmployeeChoices  
        }
    ])

.then(function (answer) {

    var query = `DELETE FROM employee WHERE ?`;
    // when finished prompting, insert a new item into the db with that info
    connection.query(query, { id: answer.employeeId }, function (err, res) {
      if (err) throw err;

      console.table(res);
      console.log(res.affectedRows + "Deleted!\n");

      firstPrompt();
    });
  });
}

/////  2- Section       Function - 9      2  consecutive  /////