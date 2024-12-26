document.addEventListener("DOMContentLoaded", function (e) {
  const add_expense = document.querySelector("#btn");
  const description = document.querySelector("#desc");
  const amount = document.querySelector("#amount");
  const expense_list = document.querySelector(".expense-list");
  const display = document.querySelector(".display");
  let total = document.querySelector("#total-expense");

  let total_expense = 0;
  let array_expense = JSON.parse(localStorage.getItem("expense")) || [];
  array_expense.forEach((expense) => renderTask(expense));

  add_expense.addEventListener("click", function (e) {
    let desc = description.value.trim();
    let am = parseFloat(amount.value.trim());
    if (desc === "" && am < 0 && !isNaN(am)) {
      return;
    }
    let newexpense = {
      id: Date.now(),
      expense: am,
      description: desc,
    };

    array_expense.push(newexpense);
    renderTask(newexpense);
    savetask();
    amount.value = "";
    description.value = "";
  });

  function renderTask(expense) {
    let li = document.createElement("li");
    li.innerHTML = `<span> ${expense.description}-$${expense.expense} </span>
    <button>Delete</button>`;
    expense_list.appendChild(li);
    saveexpense(expense);
    li.querySelector("button").addEventListener("click", function (e) {
      e.stopPropagation();
      array_expense = array_expense.filter((ex) => ex.id != expense.id);
      savetask();
      reduceexpense(expense);
      li.remove();
    });
  }

  function savetask() {
    localStorage.setItem("expense", JSON.stringify(array_expense));
  }

  function saveexpense(expense) {
    total_expense += parseFloat(expense.expense);

    console.log(expense.expense);
    total.textContent = total_expense;

    // let p = document.createElement("p");
    // p.innerHTML = `${total_expense}`;
    // display.appendChild(p);
  }
  function reduceexpense(expense) {
    total_expense -= parseFloat(expense.expense);
    total.textContent = total_expense;
    // let p = document.createElement("p");
    // p.innerHTML = `${total_expense}`;
    // display.appendChild(p);
  }
});
