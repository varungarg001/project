document.addEventListener("DOMContentLoaded", function () {
  const todoinput = document.getElementById("todo-input");
  const addtaskbtn = document.getElementById("todo-btn");
  const todolist = document.getElementById("todo-list");

  let task = JSON.parse(localStorage.getItem("task")) || [];

  task.forEach((task) => renderTask(task));

  addtaskbtn.addEventListener("click", function (e) {
    let tasktext = todoinput.value.trim();
    if (tasktext === "") {
      return;
    }
    const newtask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };

    task.push(newtask);
    savetask();
    renderTask(newtask);
    todoinput.value = ""; // to clear the input
    // console.log(task);
  });

  function renderTask(tasks) {
    let li = document.createElement("li");
    li.setAttribute("date-time", tasks.id);
    // if (tasks.completed) li.classList.add("completed");

    li.innerHTML = `<span>${tasks.text}
    </span>
    <button>Delete</button>`;

    // li.addEventListener("click", (e) => {
    //   if (e.target.tagName === "BUTTON") {
    //     return;
    //   }
    //   tasks.completed = !tasks.completed;
    //   li.classList.toggle("completed");
    //   savetask();
    // });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      task = task.filter((t) => t.id != tasks.id);
      li.remove();
      savetask();
    });
    todolist.appendChild(li);
  }
  function savetask() {
    localStorage.setItem("task", JSON.stringify(task));
  }
});
