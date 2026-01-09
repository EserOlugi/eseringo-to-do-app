/**
 * eseringo - eseringo - Modern Todo App
 * Author: [Ayvaz Eser Ölugi]
 * GitHub: https://github.com/[EserOlugi]
 * Created: 2026
 */
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector("#clear-all");

// Verileri LocalStorage'dan al veya boş bir dizi oluştur
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

// Sayfa yüklendiğinde görevleri göster
function showTodos(filter) {
    let liTag = "";
    todos.forEach((todo, id) => {
        let completed = todo.status == "completed" ? "completed" : "";
        if (filter == todo.status || filter == "all") {
            liTag += `<li class="todo-item ${completed}">
                        <span onclick="updateStatus(${id})">${todo.name}</span>
                        <div class="actions">
                            <i onclick="deleteTask(${id})" class="fas fa-trash"></i>
                        </div>
                      </li>`;
        }
    });
    todoList.innerHTML = liTag || `<p style="text-align:center; color:#ccc;">Görev yok...</p>`;
}
showTodos("all");

// Yeni görev ekle
addBtn.addEventListener("click", () => {
    let userTask = todoInput.value.trim();
    if(userTask) {
        let taskInfo = {name: userTask, status: "pending"};
        todos.push(taskInfo);
        todoInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodos("all");
    }
});

// Görevi sil
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodos("all");
}

// Durumu güncelle (Tamamlandı/Yapılacak)
function updateStatus(id) {
    todos[id].status = todos[id].status == "pending" ? "completed" : "pending";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodos("all");
}

// Filtreleme butonları
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodos(btn.getAttribute("data-filter"));
    });
});

// Hepsini temizle
clearAll.addEventListener("click", () => {
    todos = [];
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodos("all");
});