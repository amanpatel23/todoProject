const todoLists = document.querySelector('.todo-list__tasks');
const todoInput = document.querySelector('input[type="text"]');
const todoTaskAdd = document.querySelector('button[type="submit"]');

//event
todoTaskAdd.addEventListener('click', addTask);
todoLists.addEventListener('click', taskDelete);
todoLists.addEventListener('click', checkChecked);

//function
function addTask(e){

    e.preventDefault();

    if(todoInput.value === ""){
        return;
    }
    
    //creating 'li' element
    const task = document.createElement('li');
    task.classList.add('todo-list__task');

    //create 1st 'div' element inside 'li'
    const task_name = document.createElement('div');
    task_name.classList.add('todo-list__task-name');

    //create the 'input' element inside 1st div
    const input_field = document.createElement('input');
    input_field.setAttribute('type', 'checkbox');

    //create the 'label' element inside 1st div
    const task_label = document.createElement('label');
    task_label.classList.add('todo-list__task-label');

    task_label.innerText = todoInput.value;
    nameToLocalStorage(todoInput.value);
    checkValueToLocalStorage(false);


    const new_date = Date.now().toString();
    idToLocalStorage(new_date);
    input_field.setAttribute('id', new_date);
    task_label.setAttribute('for', new_date);

    task_name.appendChild(input_field);
    task_name.appendChild(task_label);


    //create 2nd 'div' element for inside 'li'
    const task_delete = document.createElement('div');
    task_delete.classList.add('todo-list__task-delete');

    //appending delete icon button
    task_delete.innerHTML = '<i class="fas fa-trash-alt"></i>';

    //append 1st 'div' and 2nd 'div' inside 'li'
    task.appendChild(task_name);
    task.appendChild(task_delete);

    //append 'li' to 'ul'
    todoLists.appendChild(task);

    todoInput.value = "";
}

function taskDelete(e){
    const target_element = e.target;

    if(target_element.classList[0] === 'fas'){
        const target_element_parent = target_element.parentElement.parentElement;
        const index_string = target_element_parent.childNodes[0].childNodes[1].innerText;
        target_element_parent.remove();
        removeFromLocalStorage(index_string);
    }
}

function checkChecked(e){
    const target_element = e.target;
    if(target_element.classList[0] === "todo-list__task-label"){
        const index_string2 = target_element.innerText;
        update_check_arr(index_string2);
    }
}

function nameToLocalStorage(todoValue){
    let todoValue_arr;
    if(JSON.parse(localStorage.getItem("todoValue_key")) != null){
        todoValue_arr = JSON.parse(localStorage.getItem("todoValue_key"));
    }else{
        todoValue_arr = [];
    }
    todoValue_arr.push(todoValue);

    localStorage.setItem("todoValue_key", JSON.stringify(todoValue_arr));
}

function idToLocalStorage(idValue){
    let idValue_arr;
    if(JSON.parse(localStorage.getItem("inputId_key")) != null){
        idValue_arr = JSON.parse(localStorage.getItem("inputId_key"));
    }else{
        idValue_arr = [];
    }
    idValue_arr.push(idValue);

    localStorage.setItem("inputId_key", JSON.stringify(idValue_arr));
}

function checkValueToLocalStorage(checkValue){
    let checkValue_arr;
    if(JSON.parse(localStorage.getItem("checkId_key")) != null){
        checkValue_arr = JSON.parse(localStorage.getItem("checkId_key"));
    }else{
        checkValue_arr = [];
    }
    checkValue_arr.push(checkValue);

    localStorage.setItem("checkId_key", JSON.stringify(checkValue_arr));
}

function removeFromLocalStorage(index_string){
    const remove_arr1 = JSON.parse(localStorage.getItem("todoValue_key"));
    const remove_arr2 = JSON.parse(localStorage.getItem("inputId_key"));
    const remove_arr3 = JSON.parse(localStorage.getItem("checkId_key"));
    const index = remove_arr1.indexOf(index_string);
    remove_arr1.splice(index, 1);
    remove_arr2.splice(index, 1);
    remove_arr3.splice(index, 1);
    localStorage.setItem("todoValue_key", JSON.stringify(remove_arr1));
    localStorage.setItem("inputId_key", JSON.stringify(remove_arr2));
    localStorage.setItem("checkId_key", JSON.stringify(remove_arr3));
}

function update_check_arr(index_string2){
    const name_arr = JSON.parse(localStorage.getItem("todoValue_key"));
    const index2 = name_arr.indexOf(index_string2);

    const update_arr = JSON.parse(localStorage.getItem("checkId_key"));
    console.log(update_arr);
    if(update_arr[index2] === true){
        update_arr[index2] = false;
    }else{
        update_arr[index2] = true;
    }

    localStorage.setItem("checkId_key", JSON.stringify(update_arr));
}
function render_list(render_value1, render_value2, render_value3){

    
    //creating 'li' element
    const task = document.createElement('li');
    task.classList.add('todo-list__task');

    //create 1st 'div' element inside 'li'
    const task_name = document.createElement('div');
    task_name.classList.add('todo-list__task-name');

    //create the 'input' element inside 1st div
    const input_field = document.createElement('input');
    input_field.setAttribute('type', 'checkbox');
    input_field.checked = render_value3;

    //create the 'label' element inside 1st div
    const task_label = document.createElement('label');
    task_label.classList.add('todo-list__task-label');

    task_label.innerText = render_value1;
    //const new_date = Date.now().toString();

    input_field.setAttribute('id', render_value2);
    task_label.setAttribute('for', render_value2);

    task_name.appendChild(input_field);
    task_name.appendChild(task_label);


    //create 2nd 'div' element for inside 'li'
    const task_delete = document.createElement('div');
    task_delete.classList.add('todo-list__task-delete');

    //appending delete icon button
    task_delete.innerHTML = '<i class="fas fa-trash-alt"></i>';

    //append 1st 'div' and 2nd 'div' inside 'li'
    task.appendChild(task_name);
    task.appendChild(task_delete);

    //append 'li' to 'ul'
    todoLists.appendChild(task);

}

function render(){
    const render_arr1 = JSON.parse(localStorage.getItem("todoValue_key"));
    const render_arr2 = JSON.parse(localStorage.getItem("inputId_key"));
    const render_arr3 = JSON.parse(localStorage.getItem("checkId_key"))
    for(var i = 0; i < render_arr1.length; i++){
        render_list(render_arr1[i], render_arr2[i], render_arr3[i]);
    }
}

render();