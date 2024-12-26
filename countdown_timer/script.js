const input = document.querySelector("#time");
const btn = document.querySelector(".btn");
const message = document.querySelector(".message");
let refer;
btn.addEventListener("click", function (e) {
  e.preventDefault();
  refer = setInterval(calculateTime, 1000);
});

function showmessage(text) {
  let h1 = document.createElement("h1");
  h1.textContent = text;
  message.appendChild(h1);
}

function calculateTime() {
  let datentime = input.value;
  // console.log(datentime);

  let target = new Date(datentime).getTime();
  // console.log(target);
  let now = new Date().getTime();

  let gap = target - now;

  if (gap <= 0) {
    message.textContent = "";
    showmessage("Your Time IS Here!");
    clearInterval(refer);

    return;
  }

  message.textContent = "";
  let days = Math.floor(gap / (1000 * 60 * 60 * 24));
  let hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((gap % (1000 * 60)) / 1000);

  let h1 = document.createElement("h1");
  h1.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  message.appendChild(h1);
}
