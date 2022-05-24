window.addEventListener('DOMContentLoaded', () => {
    toggleMenu();
});

function toggleMenu(){
    document.querySelector(".burger_icon").addEventListener('click', (e) => {
        document.querySelector(".navigation").classList.toggle("active");
        console.log("toggle burger")
    });
}

async function getData() {
    const JSONData = await
    fetch("./data/recipes.json");
    recipes = await JSONData.json();
    console.log(recipes);
    return recipes;
}