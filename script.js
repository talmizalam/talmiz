const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const recipeContainer = document.getElementById("recipeContainer");

const modal = document.getElementById("recipeModal");
const closeBtn = document.getElementById("closeBtn");

const recipeTitle = document.getElementById("recipeTitle");
const recipeImg = document.getElementById("recipeImg");
const ingredientList = document.getElementById("ingredientList");
const recipeInstructions = document.getElementById("recipeInstructions");

// Search Event
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    alert("Please enter a recipe name");
    return;
  }

  fetchRecipe(query);
});

// Fetch API
function fetchRecipe(query) {
  recipeContainer.innerHTML = "<h3>Loading...</h3>";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => displayRecipes(data.meals))
    .catch(() => recipeContainer.innerHTML = "<h3>Error loading recipes</h3>");
}

// Display Recipe Cards
function displayRecipes(meals) {
  recipeContainer.innerHTML = "";

  if (!meals) {
    recipeContainer.innerHTML = "<h3>No recipes found</h3>";
    return;
  }

  meals.forEach(meal => {
    const div = document.createElement("div");
    div.classList.add("recipe-card");

    div.innerHTML = `
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <p>${meal.strCategory}</p>
      <button onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
    `;

    recipeContainer.appendChild(div);
  });
}

// View Full Recipe
function viewRecipe(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => showModal(data.meals[0]));
}

// Show Modal
function showModal(meal) {
  recipeTitle.innerText = meal.strMeal;
  recipeImg.src = meal.strMealThumb;
  recipeInstructions.innerText = meal.strInstructions;

  ingredientList.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient !== "") {
      const li = document.createElement("li");
      li.innerText = `${ingredient} - ${measure}`;
      ingredientList.appendChild(li);
    }
  }

  modal.style.display = "block";
}

// Close Modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerText = "☀️ Light Mode";
}

// Toggle Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.innerText = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.innerText = "🌙 Dark Mode";
  }
});
