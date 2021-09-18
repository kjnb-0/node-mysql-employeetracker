//require dotenv to use mysql login variables
require('dotenv').config();
// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require("inquirer");




// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the companyinfo_db database.`)
);

// view all departments, roles, employees 

function mainQuestions() {
  inquirer.prompt ([
    {
      type: "list",
      message: "What would you like to do?",
      name: "category",
      choices: ["View All Departments","View All Roles","View All Employees","Add Department","Add Role","Add Employee","Update Employee"]
    }
  ])
  .then(async (data) => {
    const { category } = data;
    if (category === "View All Departments") {
      viewAllDepartments();
      return;
    } else if (category === "View All Roles") {
      viewAllRoles();
      return;
    } else if (category === "View All Employees") {
      viewAllEmployees();
      return;
    } else if (category === "Add Department") {
      addDepartment();
      return;
    } else if (category === "Add Role") {
      addRole();
      return;
    }
  })
}

function viewAllDepartments() {
  // Query database
db.query('SELECT * FROM department', function (err, results) {
  if(err) console.log(err)
  console.table(results)
  //to go back to main menu
  mainQuestions();
})
}

function viewAllRoles() {
db.query('SELECT * FROM role', function (err, results) {
  if(err) console.log(err)
  console.table(results)
  mainQuestions();
})
}

function viewAllEmployees() {
db.query('SELECT * FROM employee', function (err, results) {
  if(err) console.log(err)
  console.table(results)
  mainQuestions();
})
}

function addDepartment() {
  inquirer
  .prompt({
      type: 'input',
      name: 'deptName',
      message: 'Please enter the name of the department'
  })
  .then( answers => {
       db.query(`INSERT INTO department SET ?`, {
        name : answers.deptName
       });
        console.log("Added department")
        mainQuestions();
      });
}

function addRole() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Please enter the role title'
  },
  {
    type: 'input',
      name: 'roleSalary',
      message: 'Please enter the role salary'
  },
  {
    type: 'input',
      name: 'roleId',
      message: 'Please enter the department ID for this role'
  },
])
  .then( answers => {
       db.query(`INSERT INTO role SET ?`, {
        title : answers.roleTitle,
        salary : answers.roleSalary,
        department_id : answers.roleId
       });
        console.log("Added role")
        mainQuestions();
      });
}


//separate functions for view all depts, roles and employees then call them in the if statement
mainQuestions();