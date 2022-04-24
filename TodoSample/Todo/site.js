var todoList = [];
var sayac = 0;

class TodoItem {
    constructor(isCompleted, todoText) {
        this.isCompleted = isCompleted;
        this.todoText = todoText;

        this.parentItem = document.getElementById("todoUL");
        //console.log(sayac);
        this.listItem = document.createElement("li");
        this.listItem.setAttribute("id", "todo" + sayac + "");

        this.textInput = document.createElement("input");
        this.textInput.setAttribute("id", "txt" + sayac + "");
        this.textInput.setAttribute("disabled", "disabled");
        this.textInput.setAttribute("value", this.todoText);

        this.deleteButton = document.createElement("i");

        this.editButton = document.createElement("i");
        this.editButton.setAttribute("id", "btnEdit" + sayac + "");

        this.completeButton = document.createElement("i");
        this.completeButton.setAttribute("id", "btnComplete" + sayac + "")

        sayac += 1;
    }

    getHtml = () => {
        this.textInput.type = "text";
        this.textInput.classList.add("text");
        this.listItem.appendChild(this.textInput);

        this.deleteButton.className = "fa-light fa-trash-can";
        this.deleteButton.setAttribute("onclick", "DeleteItem(this)");
        this.listItem.appendChild(this.deleteButton);

        this.editButton.className = "fa-light fa-pen";
        this.editButton.setAttribute("onclick", "EditItem(this)");
        this.listItem.appendChild(this.editButton);


        this.completeButton.className = this.isCompleted ? "fa-solid fa-rotate-left" : "fa-light fa-check";
        
       
        this.completeButton.setAttribute("onclick", "ComplateItem(this)");
        this.listItem.appendChild(this.completeButton);

        //this.parentItem.appendChild(this.listItem);

        return this.listItem;
    }
}

function DeleteItem(element) {
    var elementParent = element.parentElement;

    Delete(elementParent);
}

function Delete(elementParent) {
    var newTodoList = [];
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].listItem.id !== elementParent.id) {
            newTodoList.push(todoList[i]);
        }
    };
    todoList = [];
    todoList = newTodoList;
    refreshList();
}

function EditItem(element) {
    var elementParent = element.parentElement;
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].listItem.id === elementParent.id) {
            todoList[i].textInput.removeAttribute("disabled");
        }
    }
    refreshList();
}

function ComplateItem(element) {
    var elementParent = element.parentElement;
    for (var i = 0; i < todoList.length; i++) {
        console.log("ssss");
        if (todoList[i].listItem.id === elementParent.id) {
            if (todoList[i].isCompleted) {
                console.log("sadasd");
                todoList[i].parentItem = document.getElementById("todoUL");
                todoList[i].isCompleted = false;
                todoList[i].editButton.setAttribute("style", "display:inline-block;");
            } else {
                var x = document.getElementById("complateUL");
                todoList[i].parentItem = x;

                todoList[i].isCompleted = true;
                todoList[i].editButton.setAttribute("style", "display:none;");
            }
            refreshList();
        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    var todoInput = document.getElementById("txtTodo");
    var addButton = document.getElementById("btnAdd");

    addButton.onclick = function () {
        var todo = new TodoItem(false,todoInput.value);

        todoList.push(todo);
        refreshList();
    }
});

document.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        var textInput = e.target;

        for (var i = 0; i < todoList.length; i++) {
            if (todoList[i].textInput.id == textInput.id) {
                todoList[i].textInput.value = textInput.value;
                todoList[i].textInput.setAttribute("disabled", "disabled");
            }
        }
        refreshList();
    }
});

function refreshList() {
    var todoUL = document.getElementById("todoUL");
    var complateUL = document.getElementById("complateUL");

    todoUL.innerHTML = "";
    complateUL.innerHTML = "";

    todoList.forEach((item, index) => {
        if (item.isCompleted) {
            complateUL.appendChild(item.getHtml());
        } else {
            todoUL.appendChild(item.getHtml());
        }
        

    });
}

