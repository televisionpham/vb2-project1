document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector("#todo-list ul");
  const hideBox = document.getElementById("hide");
  const searchBar = document.getElementById("search-content");

  // xóa todo
  list.addEventListener("click", (e) => {
    if (e.target.className === "delete") {
      const li = e.target.parentElement;
      li.parentNode.removeChild(li);
    }
  });

  // hoàn thành khi check
  list.addEventListener("change", (e) => {
    if (e.target.id === "complete") {
      const li = e.target.parentElement;

      if (e.target.checked) {
        li.className = "complete";
        if (hideBox.checked) {
          li.style.display = "none";
        }
      } else {
        li.removeAttribute("class");
      }
    }
  });

  // thêm todo
  const addForm = document.getElementById("add-todo");
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // tạo elements
    const value = document.getElementById("todo-content").value;
    const li = document.createElement("li");
    const todoContent = document.createElement("span");
    const deleteBtn = document.createElement("span");
    const completeChk = document.createElement("input");

    completeChk.type = "checkbox";
    completeChk.id = "complete";

    todoContent.textContent = value;
    todoContent.classList.add("content");

    deleteBtn.textContent = "xóa";
    deleteBtn.classList.add("delete");

    li.appendChild(completeChk);
    li.appendChild(todoContent);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  // ẩn hoàn thành
  const completedList = document.getElementsByClassName("complete");
  hideBox.addEventListener("change", function (e) {
    if (hideBox.checked) {
      Array.from(completedList).forEach((c) => (c.style.display = "none"));
    } else {
      const term = searchBar.value.toLowerCase();      
      Array.from(completedList).forEach((todo) => {
        const content = todo.firstElementChild.nextElementSibling.textContent;
        if (content.toLowerCase().indexOf(term) !== -1) {
          todo.removeAttribute("style");
        }
      });
    }
  });

  // tìm kiếm
  
  searchBar.addEventListener("keyup", (e) => {
    const term = e.target.value.toLowerCase();
    const todos = list.getElementsByTagName("li");
    Array.from(todos).forEach((todo) => {
      const content = todo.firstElementChild.nextElementSibling.textContent;
      if (content.toLowerCase().indexOf(term) !== -1) {
        if (!(hideBox.checked && todo.className === "complete")) {
          todo.style.display = "block";         
        }
      } else {
        todo.style.display = "none";
      }
    });
  });
});
