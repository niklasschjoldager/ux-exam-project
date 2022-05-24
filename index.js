window.addEventListener('DOMContentLoaded', () => {
    toggleMenu();
    displayPopularRecipes();
});

function toggleMenu(){
    document.querySelector(".burger_icon").addEventListener('click', (e) => {
        document.querySelector(".navigation").classList.toggle("active");
    });
}

async function getData() {
    const JSONData = await
    fetch("./data/recipes.json");
    recipes = await JSONData.json();
    console.log(recipes);
    return recipes;
}

async function displayPopularRecipes(){
    const popularRecipes = await getData();
    console.log(popularRecipes);

    popularRecipes.forEach(recipe => {
        const clone = document.querySelector(".popular-recipes-template").cloneNode(true).content;

        clone.querySelector(".recipe__img").src = `./images/${recipe.imageURL}`;
        clone.querySelector(".recipe__title").textContent = recipe.name;
        clone.querySelector(".recipe").addEventListener("click", () => showRecipe(recipe));

        document.querySelector(".popular-recipes__container").appendChild(clone);
    });
};

function showRecipe(){
    console.log("Show recipe single view")
}