document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('task-list');

    const taskItem = document.createElement('li');
    taskItem.className = 'task';

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskItem.appendChild(taskContent);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        const newTaskText = prompt('Enter new text for the task:', taskContent.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskContent.textContent = newTaskText;
            saveTasks();
        }
    };
    taskItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(taskItem);
        saveTasks();
    };
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
    taskInput.value = '';

    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task span').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(taskText => {
        const taskList = document.getElementById('task-list');

        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskItem.appendChild(taskContent);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
            const newTaskText = prompt('Enter new text for the task:', taskContent.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                taskContent.textContent = newTaskText;
                saveTasks();
            }
        };
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskList.removeChild(taskItem);
            saveTasks();
        };
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}
