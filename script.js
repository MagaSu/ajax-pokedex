// Pokemon section
const input = document.getElementById("input");
const btn = document.getElementsByClassName("btn");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const search = document.getElementById("search");
const loadAnimation = document.getElementById("loading-animation");

// Pokemon display section
const content = document.getElementById("pokemon-content");
const moves = document.getElementById("pokemon-moves");

let autoPilot = true;
let opacityOn = true;
let currentPokemonId;

const getPokemonData = async (query) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
  const response = await fetch(url);

  if (response.status == 404 || response.statusText == "Not found") {
    document.getElementById("show-error").classList.remove("disabled");
    content.innerHTML = "";
    return;
  }

  const pokemon = await response.json();

  loadAnimation.remove();

  currentPokemonId = pokemon.id;
  pokemonMoves = pokemon.moves.slice(0, 4);

  pokemonImg =
    pokemon.sprites.other.dream_world.front_default == null
      ? pokemon.sprites.other["official-artwork"].front_default
      : pokemon.sprites.other.dream_world.front_default;

  document.getElementById("info-title").innerText = "Characteristic";
  document.getElementById("pokemon-name").innerText = pokemon.name;
  document.getElementById("pokemon-img").setAttribute("src", pokemonImg);
  document.getElementById(
    "pokemon-hp"
  ).innerText = `Health:  ${pokemon.stats[0].base_stat}hp`;
  document.getElementById(
    "pokemon-xp"
  ).innerText = `Damage: ${pokemon.base_experience}xp`;
  document.getElementById(
    "pokemon-type"
  ).innerText = `Type: ${pokemon.types[0].type.name}`;
  document.getElementById(
    "pokemon-weight"
  ).innerText = `Weight:  ${pokemon.weight}kg`;
  document.getElementById(
    "pokemon-height"
  ).innerText = `Height: ${pokemon.height}m`;
  document.getElementById("pokemon-id").innerText = `ID: ${pokemon.id}`;

  document.getElementById("moves-title").innerText = "Moves";
  moves.innerHTML = "";
  pokemonMoves.map((p) => {
    if (p < 0) {
      console.log("No moves");
    }
    let li = document.createElement("li");
    li.innerHTML = p.move.name;
    moves.appendChild(li);
  });
  if (opacityOn) {
    for (let i = 1; i < 100; i++) {
      document.getElementById("pokemon-display").style.opacity = `${i}%`;
      document.getElementById("search-section").style.opacity = `${i}%`;
    }
    setTimeout(() => {
      document.getElementById("pokemon-display").classList.remove("hidden");
    }, 2000);
    opacityOn = false;
    document.getElementById("search-section").classList.remove("hidden");
    previous.classList.remove("disabled");
    next.classList.remove("disabled");
  }
};

const mode = setInterval(() => {
  if (autoPilot == true) {
    let randomId = Math.floor(Math.random() * 898) + 1;
    getPokemonData(randomId);
  } else {
    clearInterval(mode);
  }
}, 5000);

input.addEventListener("input", (e) => {
  if (!input.value == "") {
    autoPilot = "off";
    changeClass("searchOn");
  } else {
    changeClass("searchOff");
  }
});
search.addEventListener("click", () => {
  getPokemonData(input.value.toLowerCase());
  input.value = "";
  changeClass("searchOff");
});
previous.addEventListener("click", () => {
  autoPilot = false;
  currentPokemonId = currentPokemonId - 1;
  currentPokemonId = currentPokemonId < 1 ? 898 : currentPokemonId;
  getPokemonData(currentPokemonId);
});
next.addEventListener("click", () => {
  autoPilot = false;
  currentPokemonId = currentPokemonId + 1;
  currentPokemonId = currentPokemonId > 898 ? 1 : currentPokemonId;
  getPokemonData(currentPokemonId);
});

function changeClass(option) {
  if (option == "searchOn") {
    search.classList.remove("disabled");
    previous.classList.add("disabled");
    next.classList.add("disabled");
  } else {
    search.classList.add("disabled");
    previous.classList.remove("disabled");
    next.classList.remove("disabled");
  }
}
