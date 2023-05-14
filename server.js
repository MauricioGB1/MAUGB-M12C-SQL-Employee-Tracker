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


function firstPromt() {

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
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary`


}



function addEmployee() {
    console.log("Adding an employee!")

var query =
`SELECT r.id, r.title, r.salary
FROM role r`

connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id,title, salary}) => ({
        value: id, title: `${title}`
    }))
})


}
