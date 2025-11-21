#!/usr/bin/env node

const readline = require('readline-sync');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

let command=process.argv[2]; 

const tasksFilePath = path.join(__dirname, 'tasks.json');


function getNextTaskId(tasks) {
    return tasks.length > 0 
        ? tasks[tasks.length - 1].taskId + 1 
        : 1;
}

// Read tasks from the JSON file
function loadTasks() {
    try {
        if (!fs.existsSync(tasksFilePath)) {
            return [];
        }
        const data = fs.readFileSync(tasksFilePath, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        console.error('Error reading tasks file:', err);
        return [];
    }
}

// Write tasks to the JSON file
function saveTasks(tasks) {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing tasks file:', err);
    }
}

// Prompt user for task details
function promptForTask() {
    const rl = readline;


    const tasks = loadTasks();
    const task={};
    
    const title=rl.question('Enter task title: ');
    
    const description=rl.question('Enter task description: ')
    const dueDate=rl.question('Enter due Date: ')
        
        
    task.taskId=getNextTaskId(tasks);
    task.title=title;
    task.description=description;
    task.status = "pending";
    task.dueDate=dueDate;    
    task.TimeCreated=new Date().toISOString();
    task.lastUpdated=new Date().toISOString();
    
   
    saveTasks(tasks);
    console.log(`Task added with ID: ${task.taskId}`);
         
}

// Update task
// Fetch the task by ID 
// Save the updated task list back to the file
function taskToUpdate() {
    const tasks = loadTasks();
    const inputID=readline.question('Enter task ID to update: ')
    const id = parseInt(inputID, 10);
    const task = tasks.find(t => t.taskId === id);
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    } else {
        return id;
    }
}

const taskId=taskToUpdate();

// Prompt user for new details, Leaving unchanged if input is blank
function promptForUpdate(taskId) {
    const rl = readline;
    const tasks = loadTasks();
    const task = tasks.find(t => t.taskId === taskId);


    const newTitle=rl.question('Enter new title (leave blank to keep unchanged): ')
    const newDescription=rl.question('Enter new descripton (leave blank to keep unchanged): ')
    const newDueDate=rl.question('Enter new due date (leave blank to keep unchanged): ')
    const newStatus=rl.question('Enter new status (leave blank to keep unchanged): ')
    
    task.title=newTitle.trim() !== '' ? newTitle : task.title;
    task.description=newDescription.trim() !== '' ? newDescription : task.description;
    task.dueDate=newDueDate.trim() !== '' ? newDueDate : task.dueDate;
    task.status=newStatus.trim() !== '' ? newStatus : task.status;

    task.lastUpdated=new Date().toISOString();
    saveTasks(tasks);
    

}


promptForUpdate(taskId);

if (command=="view-tasks"){
 loadTasks();    
}
if (command=="add-task"){
 promptForTask();    
}


let taskDetail=process.argv[3];

