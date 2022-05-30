window.addEventListener("DOMContentLoaded", () => {
  toggleMenu()
  displayPopularRecipes()
  showSearchResults()
  displayNewRecipes()
  displayExploreRecipes()
  toggleModal()
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
    if (i <= 2) {
      const clone = template.cloneNode(true).content

      clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`
      clone.querySelector(".recipe__title").textContent = recipe.name
      clone.querySelector(".recipe").addEventListener("click", () => showRecipe(recipe))
      clone.querySelector(".recipe__ratings").textContent = "5 (19)"
      clone.querySelector(".recipe__author").textContent = "by " + recipe.author

      document.querySelector(".popular-recipes__container").appendChild(clone)
    }
  })
}

async function displayNewRecipes() {
  const template = document.querySelector("#frontpage-recipes-template")
  if (!template) return

  const newRecipes = await getData()
  newRecipes.forEach((recipe, i) => {
    if (i >= 3 && i <= 5) {
      const clone = template.cloneNode(true).content

      clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`
      clone.querySelector(".recipe__title").textContent = recipe.name
      clone.querySelector(".recipe").addEventListener("click", () => showRecipe(recipe))
      clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")"
      clone.querySelector(".recipe__author").textContent = "by " + recipe.author

      document.querySelector(".new-recipes__container").appendChild(clone)
    }
  })
}

function showRecipe() {
  console.log("Show recipe single view")
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
