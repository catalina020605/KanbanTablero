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


//FUNCION DE LIMPIAR Y BORRAR
function performAction(button, action) {
    const column = button.parentElement.parentElement;
    switch (action) {
        case 'clear':
            clearColumn(column);
            break;
        case 'delete':
            deleteColumn(column);
            break;
    }
}
function clearColumn(column) {
    const tasks = column.querySelectorAll('.card');
    tasks.forEach(task => {
        task.remove();
    });
}
function deleteColumn(column) {
    column.remove();
}

//FUNCION DE AGREGAR COLUMNAS
function addColumn() {
    const columnName = newColumnInput.value;
    if (columnName.trim() === '') return;

    const newColumn = document.createElement('div');
    newColumn.className = 'column';
    newColumn.innerHTML = ` 
    <h2>${columnName}</h2> 

    <div class="column-actions">
                    <button class="botonesColumnas" onclick="performAction(this, 'clear')">Limpiar  
                        <img class="iconos" src="imagenes/escoba.png" alt="escoba">
                    </button>

                    <button class="botonesColumnas" onclick="performAction(this, 'delete')">Borrar
                        <img class="iconos" src="imagenes/papelera-de-reciclaje.png" alt="papelera">
                    </button>
                </div>
    `;
    newColumn.addEventListener('dragover', dragOver);
    newColumn.addEventListener('dragenter', dragEnter);
    newColumn.addEventListener('dragleave', dragLeave);
    newColumn.addEventListener('drop', dragDrop);

    const board = document.querySelector('.board');
    board.insertBefore(newColumn, newColumnInput.parentElement);
    newColumnInput.value = '';
}


//CONATNTES MODAL
const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const taskForm = document.getElementById('taskForm');


//ABRIR Y CERRAR MODAL
openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});


const colorOptions = ['#eddded', '#daffe6', '#a9fffd', '#c8bced', '#e4c5c0'];
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = document.getElementById('newTask').value.trim();
    const taskAssignee = document.getElementById('taskAssignee').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const colorSelect = document.createElement('select'); // Elemento select para elegir color
    colorSelect.className = 'color-select';

    // Agrega opciones de color al elemento select
    for (const color of colorOptions) {
        const colorOption = document.createElement('option');
        colorOption.value = color;
        colorOption.style.backgroundColor = color;
        colorSelect.appendChild(colorOption);
    }

    if (taskText === '') return;

    const newTask = document.createElement('div');
    newTask.className = 'card';
    newTask.draggable = true;

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const taskParagraph = document.createElement('p');
    taskParagraph.className = 'tituloTarea';
    taskParagraph.textContent = taskText;

    const assigneeParagraph = document.createElement('p');
    assigneeParagraph.className = 'nomEncargado';
    assigneeParagraph.textContent = 'Encargado: ' + taskAssignee;

    const descripcionParagraph = document.createElement('p');
    descripcionParagraph.className = 'desTarea';
    descripcionParagraph.textContent = descripcion;

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

        }
    );
        document.getElementById('editedTask').value = taskText;

    });

    closeEditModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Agrega la funcionalidad para cambiar el color
    colorSelect.addEventListener('change', () => {
        newTask.style.backgroundColor = colorSelect.value;
        taskContent.style.backgroundColor = colorSelect.value;
    });

    taskContent.appendChild(taskParagraph);
    taskContent.appendChild(descripcionParagraph);
    taskContent.appendChild(assigneeParagraph);
    taskContent.appendChild(deleteButton);
    taskContent.appendChild(editButton);
    taskContent.appendChild(colorSelect); 

    newTask.appendChild(taskContent);

    newTask.addEventListener('dragstart', dragStart);
    newTask.addEventListener('dragend', dragEnd);
    const todoColumn = document.querySelector(' #tamañoBarra');
    todoColumn.appendChild(newTask);

    document.getElementById('newTask').value = '';
    document.getElementById('taskAssignee').value = '';
    document.getElementById('descripcion').value = '';
    modal.style.display = 'none';
});
