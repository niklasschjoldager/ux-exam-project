window.addEventListener("DOMContentLoaded", () => {
  toggleMenu();
  displayPopularRecipes();
  showSearchResults();
});

function toggleMenu() {
  document.querySelector(".burger_icon").addEventListener("click", (e) => {
    document.querySelector(".navigation").classList.toggle("active");
  });
}

async function getData() {
  const JSONData = await fetch("./data/recipes.json");
  recipes = await JSONData.json();
  console.log(recipes);
  return recipes;
}

async function displayPopularRecipes() {
  const popularRecipes = await getData();
  console.log(popularRecipes);

  popularRecipes.forEach((recipe) => {
    const clone = document.querySelector(".popular-recipes-template").cloneNode(true).content;

    clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`;
    clone.querySelector(".recipe__title").textContent = recipe.name;
    clone.querySelector(".recipe").addEventListener("click", () => showRecipe(recipe));

    document.querySelector(".popular-recipes__container").appendChild(clone);
  });
}

function showRecipe() {
  console.log("Show recipe single view");
}

async function showSearchResults() {
  let jsonData = await getData();
  console.log(jsonData);
  const templatePointer = document.querySelector(".recipes-template");
  const sectionPointer = document.querySelectorAll(".results");
  console.log(sectionPointer);
  sectionPointer.innerHTML = "";
  sectionPointer.forEach((section) => {
    jsonData.forEach((recipe) => {
      console.log(recipe);
      const clone = templatePointer.cloneNode(true).content;
      clone.querySelector(".recipe__image").src = "./images/" + recipe.imageURL;
      clone.querySelector(".recipe__name").textContent = recipe.name;
      clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")";
      clone.querySelector(".recipe__author").textContent = "by " + recipe.name;
      section.appendChild(clone);
    });
  });

  function getReviews(recipe) {
    console.log(recipe.reviews);
    let ratings = [];
    recipe.reviews.forEach((review) => {
      console.log(review.rating);
      ratings.push(review.rating);
    });
    console.log(ratings);
    const sum = ratings.reduce((acc, cur) => acc + cur);
    const average = sum / ratings.length;
    return parseFloat(average.toFixed(1));
  }
}