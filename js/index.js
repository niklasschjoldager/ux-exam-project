window.addEventListener("DOMContentLoaded", () => {
  toggleMenu()
  displayPopularRecipes()
  showSearchResults()
  displayNewRecipes()
  displayExploreRecipes()
  toggleModal()
  displayRecipe()
})

function toggleMenu() {
  const burgerIcon = document.querySelector(".burger_icon")
  const navigation = document.querySelector(".navigation")
  burgerIcon.addEventListener("click", (e) => {
    navigation.classList.toggle("active")
  })
}

function toggleModal() {
  const signUpButton = document.querySelector(".sign-up-button")
  const signInButton = document.querySelector(".sign-in-button")
  const signUpClose = document.querySelector(".sign-up-close")
  const signInClose = document.querySelector(".sign-in-close")
  const signUp = document.querySelector(".sign-up")
  const signIn = document.querySelector(".sign-in")

  signUpButton && signUpButton.addEventListener("click", () => signUp.showModal())
  signUpClose && signUpClose.addEventListener("click", () => signUp.close())
  signInButton && signInButton.addEventListener("click", () => signIn.showModal())
  signInClose && signInClose.addEventListener("click", () => signIn.close())
}

async function getData() {
  const JSONData = await fetch("./data/recipes.json")
  recipes = await JSONData.json()
  return recipes
}

async function displayPopularRecipes() {
  const template = document.querySelector("#frontpage-recipes-template")
  if (!template) return

  const popularRecipes = await getData()

  popularRecipes.forEach((recipe, i) => {
    if (i <= 2){
        const clone = document.querySelector("#frontpage-recipes-template").cloneNode(true).content;

        clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`;
        clone.querySelector(".recipe__title").textContent = recipe.name;
        clone.querySelector(".recipe").addEventListener("click", () => redirectToRecipe(i));
        clone.querySelector(".recipe__ratings").textContent = "5 (19)" ;
        clone.querySelector(".recipe__author").textContent = "by " + recipe.author;

        document.querySelector(".popular-recipes__container").appendChild(clone);
    }
  });
}

async function displayNewRecipes() {
  const template = document.querySelector("#frontpage-recipes-template")
  if (!template) return

  const newRecipes = await getData()
  newRecipes.forEach((recipe, i) => {
    if (i >= 3 && i <= 5){
        const clone = document.querySelector("#frontpage-recipes-template").cloneNode(true).content;

        clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`;
        clone.querySelector(".recipe__title").textContent = recipe.name;
        clone.querySelector(".recipe").addEventListener("click", () => redirectToRecipe(recipe));
        clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")";
        clone.querySelector(".recipe__author").textContent = "by " + recipe.autor;

        document.querySelector(".new-recipes__container").appendChild(clone);
    }
  });
}

function redirectToRecipe(i) {
  console.log("Show recipe single view");
  window.location.href = `/recipe-single.html?i=${i}`;
}

async function displayRecipe(){
  const allRecipes = await getData();
  console.log("_____________________");
  console.log(allRecipes);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const recepeIndex = urlParams.get('i');
  const selcetedRecipe = allRecipes[recepeIndex];
  console.log(selcetedRecipe)

  const recipeViewSection = document.querySelector(".recipe-view");
  if (!recipeViewSection) return

  recipeViewSection.querySelector(".recipe-view__image").src = `./images/${selcetedRecipe.imageURL}`

  recipeViewSection.querySelector(".recipe-view__title").textContent = selcetedRecipe.name;
  recipeViewSection.querySelector(".js-preptime-text").textContent = (selcetedRecipe.cookTime + selcetedRecipe.preparationTime) + " min.";
  recipeViewSection.querySelector(".js-servings-text").textContent = selcetedRecipe.servings;
  
  ingredientsContainer = recipeViewSection.querySelector(".recipe-view__ingrediens");
  selcetedRecipe.ingredients.forEach((ingredient) => {
      ingredientsContainer.insertAdjacentHTML("afterbegin", `<li class="ingredient"><span class="ingredient__quantity">${ingredient.quantity}</span> <span class="ingredient__text">${ingredient.name}</span></li>`);
  });

  directionsContainer = recipeViewSection.querySelector(".recipe-view__directions");
  selcetedRecipe.directions.forEach((direction) => {

      directionsContainer.insertAdjacentHTML("afterbegin", `<li class="direction">${direction}</li>`);
  });

  recipeViewSection.querySelector(".recipe-view__ad-image").src = `./images/${allRecipes[14].imageURL}`

  selcetedRecipe.reviews.forEach((review) => {
          const clone = document.querySelector(".recipe-reviews-template").cloneNode(true).content;

          clone.querySelector(".review__title").textContent = review.title;
          clone.querySelector(".review__text").textContent = review.comment;

          rating = Math.floor(review.rating);

          ratingsContainer = clone.querySelector(".review__rating");

          for (let i = 0; i < rating; i++) {
            ratingsContainer.insertAdjacentHTML("afterbegin", `<svg class="review__star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
            <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/>
            <path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18zM12 16.1a.92.92 0 0 1 .46.11l3.77 2-.72-4.21a1 1 0 0 1 .29-.89l3-2.93-4.2-.62a1 1 0 0 1-.71-.56L12 5.25 10.11 9a1 1 0 0 1-.75.54l-4.2.62 3 2.93a1 1 0 0 1 .29.89l-.72 4.16 3.77-2a.92.92 0 0 1 .5-.04z"/>
            </g>
            </svg>`);
          }

          document.querySelector(".reviews__all-recipe-reviews").appendChild(clone);
  });
}


async function showSearchResults() {
  const templatePointer = document.querySelector(".recipes-template")
  const sectionPointer = document.querySelector(".results")

  if (!templatePointer || sectionPointer) return

  let jsonData = await getData()
  sectionPointer.innerHTML = ""
  jsonData.forEach((recipe) => {
    const clone = templatePointer.cloneNode(true).content
    clone.querySelector(".recipe__image").src = "./images/" + recipe.imageURL
    clone.querySelector(".recipe__name").textContent = recipe.name

    if (recipe.type === "recipe") {
      clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")"
      clone.querySelector(".recipe__author").textContent = "by " + recipe.author
    } else {
      clone.querySelector(".recipe__text svg").textContent = ""
      clone.querySelector(".recipe__author").textContent = "AD"
    }

    sectionPointer.appendChild(clone)
  })
}

async function displayExploreRecipes() {
  let jsonData = await getData()
  const templatePointer = document.querySelector(".recipes-template")
  const sectionPointer = document.querySelectorAll(".explore__recipes")
  sectionPointer.innerHTML = ""
  sectionPointer.forEach((section) => {
    let random = jsonData.sort(() => Math.random() - Math.random()).slice(0, 3)
    random.forEach((recipe) => {
      const clone = templatePointer.cloneNode(true).content
      clone.querySelector(".recipe__img").src = "./images/" + recipe.imageURL
      clone.querySelector(".recipe__title").textContent = recipe.name

      if (recipe.type === "recipe") {
        clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")"
        clone.querySelector(".recipe__author").textContent = "by " + recipe.author
      } else {
        clone.querySelector(".recipe__text svg").textContent = ""
        clone.querySelector(".recipe__author").textContent = "AD"
      }

      section.appendChild(clone)
    })
  })
}

function getReviews(recipe) {
  let ratings = []
  recipe.reviews.forEach((review) => {
    ratings.push(review.rating)
  })
  const sum = ratings.reduce((acc, cur) => acc + cur)
  const average = sum / ratings.length
  return parseFloat(average.toFixed(1))
}
