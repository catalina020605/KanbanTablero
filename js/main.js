const columns = document.querySelectorAll('.column');
const newTaskInput = document.getElementById('newTask');
const newColumnInput = document.getElementById('newColumn');

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', dragDrop);
});

let draggedCard = null;

function dragStart() {
    draggedCard = this;
    setTimeout(() => (this.style.display = 'none'), 0);
}

function dragEnd() {
    draggedCard.style.display = 'block';
    draggedCard = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.style.border = '2px dashed #aaa';
}

function dragLeave() {
    this.style.border = 'none';
}

function dragDrop() {
    this.style.border = 'none';
    const column = this.closest('.column');
    column.insertBefore(draggedCard, column.querySelector('h2').nextSibling);
}


function performAction(select) {
    const selectedOption = select.value;
    const column = select.parentElement.parentElement;
    switch (selectedOption) {
        case 'clear':
            clearColumn(column);
            break;
        case 'delete':
            deleteColumn(column);
            break;
    }
}

function deleteColumn(column) {
    column.remove();
}

function clearColumn(column) {
    const cards = column.querySelectorAll('.card');
    cards.forEach(card => {
        card.remove();
    });
}

function addColumn() {
    const columnName = newColumnInput.value;
    if (columnName.trim() === '') return;

    const newColumn = document.createElement('div');
    newColumn.className = 'column';
    newColumn.innerHTML = `<div class="column-actions">
        <select onchange="performAction(this)">
            <option value="none">Acciones</option>
            <option value="clear">Limpiar</option>
            <option value="delete">Borrar</option>
        </select>
    </div>
    <h2>${columnName}</h2>`;
    newColumn.addEventListener('dragover', dragOver);
    newColumn.addEventListener('dragenter', dragEnter);
    newColumn.addEventListener('dragleave', dragLeave);
    newColumn.addEventListener('drop', dragDrop);

    const board = document.querySelector('.board');
    board.insertBefore(newColumn, newColumnInput.parentElement);
    newColumnInput.value = '';
}

const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const taskForm = document.getElementById('taskForm');


openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
});


closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});


taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = document.getElementById('newTask').value.trim();
    const taskAssignee = document.getElementById('taskAssignee').value.trim();
    if (taskText === '') return;

    const newTask = document.createElement('div');
    newTask.className = 'card';
    newTask.draggable = true;

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const taskParagraph = document.createElement('p');
    taskParagraph.textContent = taskText;

    const assigneeParagraph = document.createElement('p');
    assigneeParagraph.textContent = 'Encargado ' + taskAssignee;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
        newTask.remove();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', () => {
 
        editModal.style.display = 'block';
    
        saveEditButton.addEventListener('click', () => {
            const editedText = document.getElementById('editedTask').value;
            if (editedText.trim() !== '') {
                taskParagraph.textContent = editedText;
            }
    
            editModal.style.display = 'none';
        });
    
      
        document.getElementById('editedTask').value = taskText;

    });

    closeEditModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    taskContent.appendChild(taskParagraph);
    taskContent.appendChild(assigneeParagraph);
    taskContent.appendChild(deleteButton);
    taskContent.appendChild(editButton);

    newTask.appendChild(taskContent);

    newTask.addEventListener('dragstart', dragStart);
    newTask.addEventListener('dragend', dragEnd);
    

    const todoColumn = document.querySelector('.board .column:nth-child(2)');
    todoColumn.appendChild(newTask);

    document.getElementById('newTask').value = '';
    document.getElementById('taskAssignee').value = '';
    modal.style.display = 'none';
});
