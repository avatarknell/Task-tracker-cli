#!/usr/bin/env node

const readline = require('readline-sync');
const fs = require('fs');
const path = require('path');

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
    
   
    tasks.push(task);
    saveTasks(tasks);
         
}

// Update task


if (command=="view-tasks"){
 loadTasks();    
}
if (command=="add-task"){
 promptForTask();    
}


let taskDetail=process.argv[3];

