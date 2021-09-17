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
      message: "What would you like to view?",
      name: "category",
      choices: ["All Departments","All Roles","All Employees","None - I want to add"]
    }
  ])
  .then(async (data) => {
    const { category } = data;
    if (category === "All Departments") {
      viewAllDepartments();
      return;
    } else if (category === "All Roles") {
      viewAllRoles();
      return;
    } else if (category === "All Employees") {
      viewAllEmployees();
      return;
    } else {
      // none - i want to add
      //ask what we want to add,
      //run functions for adding to each table 
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
    // Query database
db.query('SELECT * FROM role', function (err, results) {
  if(err) console.log(err)
  console.table(results)
  //to go back to main menu
  mainQuestions();
})
}

function viewAllEmployees(){
    // Query database
db.query('SELECT * FROM employee', function (err, results) {
  if(err) console.log(err)
  console.table(results)
  //to go back to main menu
  mainQuestions();
})
}

//separate functions for view all depts, roles and employees then call them in the if statement
mainQuestions();