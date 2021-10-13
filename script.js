let input = document.getElementById("pokemon-input");
let btn = document.getElementsByClassName("btn");
let previousBtn = document.getElementById("pokemon-previous");
let nextBtn = document.getElementById("pokemon-next");
let searchBtn = document.getElementById("pokemon-search");

input.addEventListener("input", () => {
  if (!input.value == "") {
    searchBtn.classList.remove("disabled");
    previousBtn.classList.add("disabled");
    nextBtn.classList.add("disabled");
  } else {
    searchBtn.classList.add("disabled");
    previousBtn.classList.remove("disabled");
    nextBtn.classList.remove("disabled");
  }
});
