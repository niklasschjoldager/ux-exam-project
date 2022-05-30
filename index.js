window.addEventListener("DOMContentLoaded", () => {
    toggleMenu();
    displayPopularRecipes();
    showSearchResults();
    displayNewRecipes();
    displayExploreRecipes();
    displayRecipe();
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

    popularRecipes.forEach((recipe, i) => {
        if (i <= 2){
            const clone = document.querySelector("#frontpage-recipes-template").cloneNode(true).content;
    
            clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`;
            clone.querySelector(".recipe__title").textContent = recipe.name;
            clone.querySelector(".recipe").addEventListener("click", () => redirectToRecipe(i));
            clone.querySelector(".recipe__ratings").textContent = "5 (19)" ;
            clone.querySelector(".recipe__author").textContent = "by " + recipe.name;
    
            document.querySelector(".popular-recipes__container").appendChild(clone);
        }
    });
}

async function displayNewRecipes() {
    const newRecipes = await getData();
    console.log(newRecipes);

    newRecipes.forEach((recipe, i) => {
        if (i >= 3 && i <= 5){
            const clone = document.querySelector("#frontpage-recipes-template").cloneNode(true).content;
    
            clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`;
            clone.querySelector(".recipe__title").textContent = recipe.name;
            clone.querySelector(".recipe").addEventListener("click", () => redirectToRecipe(recipe));
            clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")";
            clone.querySelector(".recipe__author").textContent = "by " + recipe.name;
    
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

    recipeViewSection.querySelector(".recipe-view__image").src = `./images/${selcetedRecipe.imageURL}`
    
    ingredientsContainer = recipeViewSection.querySelector(".recipe-view__ingrediens");
    selcetedRecipe.ingredients.forEach((ingredient) => {
        console.log(ingredient)
        ingredientsContainer.insertAdjacentHTML("afterbegin", `<li class="ingredient"><span class="ingredient__text">${ingredient.name}</span><span class="ingredient__quantity">${ingredient.quantity}</span></li>`);
    });

    

    // .src = `./images/${selcetedRecipe.imageURL}`
    // function function1() {
    //     var ul = document.getElementById("list");
    //     var li = document.createElement("li");
    //     li.appendChild(document.createTextNode("Four"));
    //     ul.appendChild(li);
    //   }

    // newRecipes.forEach((recipe, i) => {
    //     if (i >= 3 && i <= 5){
    //         const clone = document.querySelector("#frontpage-recipes-template").cloneNode(true).content;
    
    //         clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`;
    //         clone.querySelector(".recipe__title").textContent = recipe.name;
    //         clone.querySelector(".recipe").addEventListener("click", () => redirectToRecipe(recipe));
    //         clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")";
    //         clone.querySelector(".recipe__author").textContent = "by " + recipe.name;
    
    //         document.querySelector(".new-recipes__container").appendChild(clone);
    //     }
    // });
}

async function showSearchResults() {
    let jsonData = await getData();
    console.log(jsonData);
    const templatePointer = document.querySelector(".recipes-template");
    const sectionPointer = document.querySelector(".results");
    console.log(sectionPointer);
    sectionPointer.innerHTML = "";
    jsonData.forEach((recipe) => {
        const clone = templatePointer.cloneNode(true).content;
        clone.querySelector(".recipe__image").src = "./images/" + recipe.imageURL;
        clone.querySelector(".recipe__name").textContent = recipe.name;

        if (recipe.type === "recipe") {
        clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")";
        clone.querySelector(".recipe__author").textContent = "by " + recipe.name;
        } else {
        clone.querySelector(".recipe__text svg").textContent = "";
        clone.querySelector(".recipe__author").textContent = "AD";
        }

        sectionPointer.appendChild(clone);
    });
}

async function displayExploreRecipes() {
    let jsonData = await getData();
    const templatePointer = document.querySelector(".recipes-template");
    const sectionPointer = document.querySelectorAll(".explore__recipes");
    sectionPointer.innerHTML = "";
    sectionPointer.forEach((section) => {
        let random = jsonData.sort(() => Math.random() - Math.random()).slice(0, 3);
        random.forEach((recipe) => {
        const clone = templatePointer.cloneNode(true).content;
        clone.querySelector(".recipe__img").src = "./images/" + recipe.imageURL;
        clone.querySelector(".recipe__title").textContent = recipe.name;

        if (recipe.type === "recipe") {
            clone.querySelector(".recipe__ratings").textContent = getReviews(recipe) + " (" + recipe.reviews.length + ")";
            clone.querySelector(".recipe__author").textContent = "by " + recipe.name;
        } else {
            clone.querySelector(".recipe__text svg").textContent = "";
            clone.querySelector(".recipe__author").textContent = "AD";
        }

        section.appendChild(clone);
        });
    });
}

function getReviews(recipe) {
    console.log(recipe);
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
