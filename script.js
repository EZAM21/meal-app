const cardContainer = document.querySelector(".card-container");
const rangeInput = document.querySelector("#rangeInput");
const sortBtn = document.querySelector("#sortBtn");
const rangeDisplay = document.querySelector("#rangeDisplay");
const searchInput = document.querySelector("#searchInput");

let meals = [];
let sortMethod = true; // true = ascendant, false = descendant

function fetchMeal(name) {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La réponse de l'API n'est pas ok.");
      }
      return response.json();
    })
    .then((data) => {
      meals = data.meals;
      displayMeal();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la récupération des repas :", error);
    });
}

searchInput.addEventListener("input", (e) => {
  fetchMeal(searchInput.value);
});

rangeInput.addEventListener("input", (e) => {
  rangeDisplay.innerHTML = rangeInput.value;
  displayMeal();
});

sortBtn.addEventListener("click", (e) => {
  sortMethod = !sortMethod;
  sortBtn.innerHTML = !sortMethod ? "Croissant" : "Décroissant";
  displayMeal();
});

function displayMeal() {
  cardContainer.innerHTML = "";
  meals
    .sort((a, b) => {
      if (sortMethod) {
        return a.strMeal.localeCompare(b.strMeal);
      } else {
        return b.strMeal.localeCompare(a.strMeal);
      }
    })
    .slice(0, rangeInput.value)
    .map((m) => {
      cardContainer.innerHTML += `
        <div class="card">
          <span class="name">${m.strMeal}</span>
          <img src="${m.strMealThumb}" alt="IMAGE ${m.strMeal}" width="300px"/>
          <div class="recipe">
            ${m.strInstructions}
          </div>
        </div>
      `;
    });
}

fetchMeal("chicken");
