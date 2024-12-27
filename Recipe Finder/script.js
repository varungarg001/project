const recipe = document.querySelector("#recipeinput");
const btn = document.querySelector("#btn");
const list = document.querySelector(".list");
const heading =document.querySelector("#heading");
const API_KEY = "e27a1a35d7444df98b00a04310129863";
const API_URL = "https://api.spoonacular.com/recipes/complexSearch";

btn.addEventListener("click", async function (e) {
  e.preventDefault();
  list.textContent = "";
  let recipething = recipe.value.trim();
  console.log(recipething);
  recipe.value = "";

  if (recipething === "") {
    return;
  }

  let respone = await fetch(
    `${API_URL}?query=${recipething}&number=10&apiKey=${API_KEY}`
  );

  let data = await respone.json();
  console.log(data);
  heading.textContent = `Recipes for ${recipething}`;

  data.results.forEach((element) => {
    let li = document.createElement("li");
    li.textContent = `${element.title}`;
    list.appendChild(li);
  });
});
