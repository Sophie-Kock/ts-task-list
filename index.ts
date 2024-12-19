document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task') as HTMLInputElement;
    const taskList = document.getElementById('task-list') as HTMLUListElement;
    const addTaskButton = document.getElementById('add-task') as HTMLButtonElement;
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');

    const KEY_ENTER = 13;

    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';

    taskInput.parentNode?.insertBefore(errorMessage, taskInput.nextSibling);

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.keyCode === KEY_ENTER) {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            errorMessage.textContent = 'Fehler: Das Eingabefeld darf nicht leer sein.';
            return;
        }

        errorMessage.textContent = ''; // Clear error message

        const li = document.createElement('li');
        li.classList.add('task-item');
        li.textContent = taskText;

        // Add time span
        const dateSpan = document.createElement('span');
        dateSpan.classList.add('task-time');
        const taskCreationTime = Date.now();
        const minutesAgo = Math.floor((Date.now() - taskCreationTime) / 60000);
        dateSpan.textContent = ` (vor ${minutesAgo} Minuten)`;
        dateSpan.style.marginLeft = '10px';
        li.appendChild(dateSpan);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = '✖'; // Unicode for cross

        deleteButton.addEventListener('mouseover', () => deleteButton.style.backgroundColor = 'red');
        deleteButton.addEventListener('mouseout', () => deleteButton.style.backgroundColor = '');
        deleteButton.addEventListener('click', () => taskList.removeChild(li));

        // Done button
        const doneButton = document.createElement('button');
        doneButton.classList.add('done-button');
        doneButton.textContent = '✔'; // Unicode for checkmark
        doneButton.addEventListener('mouseover', () => {
            if (!li.classList.contains('done')) {
                doneButton.style.backgroundColor = 'lightgreen';
            }
        });
        doneButton.addEventListener('mouseout', () => {
            if (!li.classList.contains('done')) {
                doneButton.style.backgroundColor = '';
            }
        });
        doneButton.addEventListener('click', () => {
            li.classList.toggle('done');
            if (li.classList.contains('done')) {
                doneButton.style.backgroundColor = 'green';
                li.style.textDecoration = 'line-through';
            } else {
                doneButton.style.backgroundColor = '';
                li.style.textDecoration = '';
            }
        });

        taskInput.value = '';

        li.appendChild(deleteButton);
        li.appendChild(doneButton);
        taskList.appendChild(li);
    }
});
