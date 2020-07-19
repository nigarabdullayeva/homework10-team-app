const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const newEmployee = [];

const questions = [
    {
        type: "list",
        message: "Do you want add new employee? If yes, please select position.If no, select Next time",
        name: "employeeTitle",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "Next Time"
        ]
    }
];

const questionForManager = [
    {
        type: "input",
        message: "Please enter the name of employee",
        name: "name"
    },
    {
        type: "input",
        message: "Please enter email adress",
        name: "email"
    },
    {
        type: "input",
        message: "Please enter Id number",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter office number",
        name: "officeNumber"
    },
]

const questionForEngineer = [
    {
        type: "input",
        message: "Please enter the name of employee",
        name: "name"
    },
    {
        type: "input",
        message: "Please enter email adress",
        name: "email"
    },
    {
        type: "input",
        message: "Please enter Id number",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter Github username",
        name: "github"
    },
]
const questionForIntern = [
    {
        type: "input",
        message: "Please enter the name of employee",
        name: "name"
    },
    {
        type: "input",
        message: "Please enter email adress",
        name: "email"
    },
    {
        type: "input",
        message: "Please enter Id number",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter your school name",
        name: "school"
    },
]

function createList() {
    const response = inquirer
    .prompt(questions)
    .then(function (response) {
        if (response.employeeTitle === "Manager") {
            manager();
        } else if (response.employeeTitle === "Engineer") {
            engineer();
        } else if (response.employeeTitle === "Intern") {
            intern();
        } else if (response.employeeTitle === "Next Time") {
            stop();
        }
    });
}

function manager() {
    inquirer.prompt(questionForManager)
    .then(function(response){
        let addManager = new Manager(response.name, response.id, response.email, response.officeNumber)
        newEmployee.push(addManager);
        createList();
    })
}
function engineer() {
    inquirer.prompt(questionForEngineer)
    .then(function(response){
        let addEngineer = new Engineer(response.name, response.id, response.email, response.github)
        newEmployee.push(addEngineer);
        createList();
    })
}
function intern() {
    inquirer.prompt(questionForIntern)
    .then(function(response){
        let addIntern = new Intern(response.name, response.id, response.email,response.school)
        newEmployee.push(addIntern);
        createList();
    })
}


function stop() {
    const  html = render(newEmployee);
    writeFile(html);
}

function writeFile(html) {
    fs.writeFile(outputPath, html,  (err) => {
        if (err) throw err;
        console.log("Your file successfully created!");
    })
}

createList();
